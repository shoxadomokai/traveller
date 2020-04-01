const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client"
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        exclude: path.resolve(__dirname, "src/client/views/index.html"),
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Traveller",
      template: "./src/client/views/index.html",
      filename: "index.html",
      favicon: "./src/client/views/favicon.png"
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ]
};
