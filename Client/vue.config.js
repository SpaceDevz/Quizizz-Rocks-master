module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: /node_modules/
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Quizizz.Rocks - Get all the answers for your Quizizz's";
      return args;
    });
  }
};
