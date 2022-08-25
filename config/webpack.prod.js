const { merge } = require("webpack-merge");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production", // 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
  target: "web",
  output: {
    filename: "[name].[contenthash:8].js",
    publicPath: "",
    clean: true,
  },
  devtool: false,
  plugins: [
    new AntdDayjsWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ],
});
