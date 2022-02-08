const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  let isProduction = (argv.mode === 'production');

  let config = {
    context: path.resolve(__dirname, ""),

    devServer: {
      publicPath: '/build',
      watchContentBase: true,
      compress: false,
    },

    entry: [
      "./scss/app.scss",
    ],

    devtool: "inline-source-map",

    output: {
      filename: "js/app.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "../"
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/app.css"
      }),
      new CopyPlugin([
        {from: 'html', to: ''},
      ]),
    ],

    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(),
        new TerserPlugin(),
      ],
    },
    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      ]
    },
  };

  if (isProduction) {
    config.plugins.push(
      new CleanWebpackPlugin()
    );
  }

  return config;
};
