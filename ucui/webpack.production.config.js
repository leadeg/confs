const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildPath = `https://images.hepsiburada.net/hermes/usercontent/${process.env.REACT_APP_VERSION}/`;
module.exports = {
  mode: 'production',
  entry: {
    vendors: [...Object.keys(require('./package.json').dependencies).map((package) => package)],
    bundle: './app/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
              publicPath: buildPath !== './' ? `${buildPath.slice(0, -1)}/assets` : buildPath,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
              publicPath: buildPath !== './' ? `${buildPath.slice(0, -1)}/assets` : buildPath,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      App: path.resolve(__dirname, 'app/'),
      Components: path.resolve(__dirname, 'app/components'),
      Views: path.resolve(__dirname, 'app/views'),
      Store: path.resolve(__dirname, 'app/store'),
      Services: path.resolve(__dirname, 'app/services'),
      Routes: path.resolve(__dirname, 'app/routes'),
      Assets: path.resolve(__dirname, 'app/assets'),
      Utils: path.resolve(__dirname, 'app/utilities'),
    },
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: buildPath,
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[chunkhash].css',
      chunkFilename: 'assets/[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      minify: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    concatenateModules: false,
  },
  devtool: 'none',
};
