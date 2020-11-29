const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common');

const envConfig = common.plugins[0].definitions['process.env'];

let newConfig;

newConfig = 'window.HBConfig = { ';

Object.keys(envConfig).map((key, index) => {
  newConfig += `${key}: ${envConfig[key]}`;

  if (Object.keys(envConfig).length > index + 1) {
    newConfig += ', ';
  }
});

newConfig += '}';

module.exports = merge(common, {
  mode: 'development',
  entry: ['./app/index.js'],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              modules: true,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: false,
              resources: ['./app/assets/stylesheets/_variables.scss'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      environment: `<script>${newConfig}</script>`,
    }),
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[id].css',
      orderWarning: true,
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
  ],
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    public: 'hermes.dev.hepsiburada.com:8083',
    port: 8083,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
