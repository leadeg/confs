const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

const envConfig = baseConfig.plugins[0]['definitions']['process.env'];

let newConfig;

newConfig = 'window.HBConfig = { ';

Object.keys(envConfig).map((key, index) => {
  newConfig += `${key}: ${envConfig[key]}`;

  if (Object.keys(envConfig).length > index + 1) {
    newConfig += ', ';
  }
});

newConfig += '}';

const config = {
  mode: 'development',
  entry: ['./app/index.js'],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
              modules: true, // if you use cssModules, this can help.
              reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
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
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js',
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
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot: true,
    watchContentBase: true,
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    public: 'hermes.dev.hepsiburada.com:8080',
    port: 8080,
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
  devtool: 'cheap-module-eval-source-map',
  watch: true,
};

module.exports = merge(baseConfig, config);
