const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/public/script/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.client.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/views/index.html" })]
};
