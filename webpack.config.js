const path = require("path");

module.exports = {
  entry: "./src/_app.tsx",
  devtool: "inline-source-map",
  mode: "development",
  // the webpack config just works
  // SEE https://github.com/webpack/webpack/issues/1599
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "tslint-loader",
        enforce: "pre",
        options: {
          fix: true,
          tsConfigFile: "tsconfig.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  externals: {
    puppeteer: 'require("puppeteer")',
    fs: 'require("fs")',
  },
};
