const { merge } = require("webpack-merge");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production", // 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
  target: "web",
  output: {
    filename: "[name].[chunkhash:8].js",
    publicPath: "", // 填写某个path
    clean: true,
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      TINYMCE_PUBLIC_PATH: JSON.stringify("./public"),
    }),
    new CopyPlugin({ patterns: [{ from: "public", to: "public" }] }),
    // new BundleAnalyzerPlugin()
  ],
});
