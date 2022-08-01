const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
  output: { filename: "[name].[fullhash:8].js" },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
      },
    ],
  },

  plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 1231, // 指定端口号以侦听以下请求：
    hot: true, // 启用 webpack 的 Hot Module Replacement 功能：
    client: { logging: "info" },
    historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
    compress: true, // 为每个静态文件开启 gzip compression
    // proxy: {
    //   "/api": {
    //     target: "", // 填写某个地址
    //     pathRewrite: { "^/api": "" },
    //     changeOrigin: true,
    //   },
    // },
  },
});
