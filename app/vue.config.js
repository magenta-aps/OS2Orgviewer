// vue.config.js

process.env.VUE_APP_VERSION = require("./package.json").version

module.exports = {
  outputDir: "dist",
  publicPath: "", // serve assets under a relative path.
  productionSourceMap: false,
  transpileDependencies: ["non-layered-tidy-tree-layout"],
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.ts$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
      ],
    },
  },
}
