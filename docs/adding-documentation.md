---
sidebar_position: 99999
---

# Adding documentation

For IIIF Commons contributors you can have a `/docs` file automatically synced to this documentation site by adding
the following GitHub action:

`.github/workflows/update-docs.yml`
```yaml
name: Update documentation

on:
  push:
    branches: [ 'main' ]
    paths:
      - ".github/workflows/update-docs.yml"
      - "docs/**"

jobs:
  updating-documentation:
    runs-on: ubuntu-latest
    steps:
      - uses: DrizlyInc/workflow-dispatch-action@v0.1.0
        with:
          app_id: 247822
          private_key: ${{ secrets.COMMON_DOCS_KEY }}
          target_repository: IIIF-Commons/common-docs
          target_ref: main
          workflow_filename: docs-update
          wait_for_check: false
          workflow_inputs: |
            { "branch": "main" }
        continue-on-error: true
```

You also need to make sure you add a `config.yaml` to the `/docs` folder with a label for your library:
```yaml
label: My Library Name
```

This will appear in the sidebar of this documentation. If you want to also add an automatically generated summary page
for your documentation you can add:
```yaml
label: My Library Name
link:
  type: generated-index
  description: What my library does

```

To see an example check [Vault](https://github.com/iiif-commons/vault) ( [workflow](https://github.com/IIIF-Commons/vault/blob/main/.github/workflows/update-docs.yml), [docs](https://github.com/IIIF-Commons/vault/tree/main/docs) )
