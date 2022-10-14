#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const chalk = require('chalk');
const argv = yargs(hideBin(process.argv)).argv
const fetch = require('node-fetch');
const yaml = require('yaml');
const fs = require('fs/promises');
const execa = require('execa');
const path = require('path');

const branch = argv.branch || main;
const _repo = (argv.repo || '').toLowerCase();

if (!_repo) {
  throw new Error('No repository');
}

if (!_repo.indexOf('/') !== -1 && _repo.startsWith(`IIIF-Commons/`)) {
  throw new Error('Invalid repository');
}

const repo = _repo.replace(/iiif-commons\//, '');

  async function main() {
  log`Updating documentation for ${`iiif-commons/${repo}`} on branch ${branch}\n`;

  // 1. Remove existing docs.
  await execa(`rm`, ['-rf', './.temp']);

  // 2. Git clone new docs
  log`Cloning repository to ${`./.temp`}`;
  await execa(`git`, ['clone', `https://github.com/IIIF-Commons/${repo}.git`, `--branch=${branch}`, '.temp']);

  // Now replace.
  log`Copying new documentation to ${`./docs/${repo}`}`;
  await execa(`rm`, ['-rf', path.join(process.cwd(), './docs', repo)]);
  await execa(`cp`, ['-R', './.temp/docs', `./docs/${repo}`]);

  log`Cleaning up ${`./.temp`}`;
  await execa(`rm`, ['-rf', './.temp']);

  const {stdout: resp} = await execa(`git`, ['status', '--porcelain']);

  if (!resp) {
    log`No changes detected`;
    process.exit(0);
  }

  log`Running ${`docusaurus build`} to validate changes`;
  await execa(`yarn`, ['build']).catch((error) => {
    err`Docusaurus build failed`;
    console.log(error.stderr);
    process.exit(1);
  });

  if (argv.ci) {
    log`Successfully added changes, commiting`;
    await execa(`git`, ['add', `./docs/${repo}`]);
    await execa(`git`, ['commit', `-m "Updating documentation for iiif-commons/${repo}"`])
  }

  console.log(chalk.green`\nSuccess!`);
}


main().catch((e) => {
  err`Unknown error \n\n${e}`
  process.exit(1);
})


// Helpers.
function log(strings, ...values) {
  let str = '';
  for (let i = 0; i < strings.length; i ++) {
    str += chalk.white(strings[i]);
    if (values[i]) {
      str += chalk.green.bold(values[i]);
    }
  }
  console.log(str);
}

function err(strings, ...values) {
  let str = '';
  for (let i = 0; i < strings.length; i ++) {
    str += chalk.red(strings[i]);
    if (values[i]) {
      str += chalk.blue.white(values[i]);
    }
  }
  console.log(str);
}
