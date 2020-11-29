const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const voltranCommon = require('@voltran/common');
require('intersection-observer');

const packageJson = require('./package.json');
const isBuildingForCDN = process.argv.includes('--for-cdn');
const env = process.env.VOLTRAN_ENV || 'local';
const fragmentManifest = require('./src/universal/partials/index.js');
const appConfigFilePath = path.resolve(__dirname, `./src/conf/${env}.conf.js`);
const appConfig = require(appConfigFilePath);
const commonConfig = require('./webpack.common.config');
const postCssConfig = require('./postcss.config');
const isDebug = !process.argv.includes('--release');
const reScript = /\.(js|jsx|mjs)$/;
const distFolderPath = path.resolve(__dirname, 'build');
const clientEntryFiles = ['intersection-observer', path.resolve(__dirname, 'src/client/client.js')];

if (isDebug) {
  clientEntryFiles.push('webpack-hot-middleware/client');
}

let chunks = {};

chunks.client = [
  '@babel/polyfill',
  'intersection-observer',
  path.resolve(__dirname, 'src/client/client.js'),
];

for (index in fragmentManifest) {
  const fragmentUrl = fragmentManifest[index];
  console.log(fragmentUrl);
  let arr = fragmentUrl.split(path.sep);
  const name = arr[arr.length - 1];

  chunks[name] = [fragmentUrl];
}

const APP_BUILD_VERSION = process.env.APP_BUILD_VERSION || packageJson.version;

fs.copyFileSync(appConfigFilePath, path.resolve(__dirname, 'src/universal/appConfig.js'));

const outputPath = path.resolve(__dirname, 'build/public/project/assets');

const clientConfig = webpackMerge(commonConfig, {
  name: 'client',

  target: 'web',

  mode: isDebug ? 'development' : 'production',

  entry: chunks,

  output: {
    path: outputPath,
    publicPath: `/project/assets/`,
    filename: isDebug ? '[name]-[hash].js' : '[name]-.js',
    chunkFilename: '[name]-[chunkhash].js',
    jsonpFunction: 'WP_HRMS_VLTRN',
  },

  module: {
    rules: [
      {
        test: reScript,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDebug,
        },
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          isDebug
            ? {
                loader: 'style-loader',
                options: {
                  insertAt: 'top',
                  singleton: true,
                  sourceMap: false,
                },
              }
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: isDebug,
              localIdentName: appConfig.isCssClassNameObfuscationEnabled
                ? '[name]-[hash:base64:5]'
                : '[name]-[local]',
              minimize: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssConfig,
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDebug,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: false,
              resources: ['src/assets/styles/import.scss'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDebug
            ? {
                loader: 'style-loader',
                options: {
                  insertAt: 'top',
                  singleton: true,
                  sourceMap: false,
                },
              }
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              sourceMap: isDebug,
              minimize: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssConfig,
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDebug
            ? {
                loader: 'style-loader',
                options: {
                  insertAt: 'top',
                  singleton: true,
                  sourceMap: isDebug,
                },
              }
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDebug,
              localIdentName: appConfig.isCssClassNameObfuscationEnabled
                ? '[name]-[hash:base64:5]'
                : '[name]-[local]',
              minimize: !isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssConfig,
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDebug,
              includePaths: ['node_modules', 'bower_components', 'src', '.'],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: false,
              resources: ['src/assets/styles/import.scss'],
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  plugins: [
    ...(isBuildingForCDN
      ? []
      : [
          new CleanWebpackPlugin([distFolderPath], {
            verbose: true,
          }),
        ]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: voltranCommon,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      __DEV__: isDebug,
      APP_BUILD_VERSION: JSON.stringify(APP_BUILD_VERSION),
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/public'),
        to: path.resolve(__dirname, 'build/public'),
      },
    ]),

    ...(isDebug
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id]-[contenthash].css',
          }),
        ]),

    new AssetsPlugin({
      path: path.resolve(__dirname, 'src/universal'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],
});

module.exports = clientConfig;
