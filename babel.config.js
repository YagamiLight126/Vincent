module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/preset-typescript",
    "@babel/preset-react",
    "@babel/preset-env",
  ];
  const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@emotion",
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
    ],
    ["@babel/plugin-transform-runtime", { useESModules: true }],
  ];

  return { presets, plugins };
};
