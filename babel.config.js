const presets = [
  "@babel/preset-typescript",
  "@babel/preset-react",
  "@babel/preset-env",
];
const plugins = [
  "@babel/proposal-class-properties",
  "@emotion",
  ["@babel/plugin-transform-runtime", { useESModules: true }],
];

module.exports = { presets, plugins };
