const webpack = require('webpack');
const path = require('path');
const env = process.env.VOLTRAN_ENV || 'local';
const appConfigFilePath = `./src/conf/${env}.conf.js`;
const appConfig = require(appConfigFilePath);
const packageJson = require('./package');
const isDebug = !process.argv.includes('--release');
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const staticAssetName = '[name]-[hash].[ext]';

const commonConfig = {
  mode: isDebug ? 'development' : 'production',

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Rules for images
      {
        test: reImage,
        oneOf: [
          // Inline lightweight images into CSS
          {
            issuer: reStyle,
            oneOf: [
              // Inline lightweight SVGs as UTF-8 encoded DataUrl string
              {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },

              // Inline lightweight images as Base64 encoded DataUrl string
              {
                loader: 'url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },
            ],
          },

          {
            loader: 'file-loader',
            options: {
              name: staticAssetName,
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: staticAssetName,
          limit: 10000
        },
      },

      {
        test: /\.(ttf|eot|otf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: staticAssetName
        },
      },
    ]
  },

  //cache: isDebug,

  stats: 'errors-only',

  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SF_MOBILE_ENV': JSON.stringify(process.env.SF_MOBILE_ENV),
      'process.env.SF_BASE_URL': JSON.stringify(appConfig.sfBaseUrl),
      'process.env.SF_MEDIA_URL': JSON.stringify(appConfig.mediaUrl),
      'STOREFRONT_APP_VERSION': JSON.stringify(packageJson.version),
      'process.env.APP_BUILD_VERSION': JSON.stringify(process.env.APP_BUILD_VERSION),
    }),
  ]
};

module.exports = commonConfig;
