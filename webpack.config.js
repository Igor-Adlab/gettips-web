const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

const config = {
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "www"),
  },
  devServer: {
    hot: true,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new Dotenv({
      safe: true,
      defaults: true,
      allowEmptyValues: true,
    }),
    new ServiceWorkerWebpackPlugin({
      filename: "firebase-messaging-sw.js",
      entry: path.join(__dirname, "src/sw.js"),
    }),
    new HtmlWebpackPlugin({
      appMountId: "app",
      filename: "index.html",
      title: "GetTips.online",
      template: "./templates/index.html",
    }),
  ],
};

module.exports = config;
