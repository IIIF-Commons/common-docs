module.exports = function(context, options) {
  return {
    name: 'loaders',
    configureWebpack() {
      return {
        resolve: {
          symlinks: false,
        }
      };
    },
  };
};
