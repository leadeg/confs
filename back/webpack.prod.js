const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const buildPath = process.env.version ? `https://images.hepsiburada.net/oms/assets/fulfilment-backoffice-ui/${process.env.version}/` : '/'

module.exports = merge(common, {
  mode: 'production',
  entry: {
    vendors: [...Object.keys(require('./package.json').dependencies).map((package) => package)],
    bundle: './app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: buildPath,
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          ExtractCssChunks.loader,
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
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: ['./app/assets/stylesheets/_variables.scss'],
            },
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
    ],
  },
  plugins: [
    new TerserJSPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new ExtractCssChunks({
      filename: 'assets/[chunkhash].css',
      chunkFilename: 'assets/[chunkhash].css',
      orderWarning: false,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({ cache: true }), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: false,
  },
})
