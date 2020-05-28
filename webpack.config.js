const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.ts"],
  context: path.resolve(__dirname),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "problem.bundle.js",
    library: "Problem",
    libraryTarget: "umd",
    publicPath: "/library/",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cwd: path.resolve(__dirname),
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
