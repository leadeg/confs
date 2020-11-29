const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const newConfigs = {};

if (process.env.NODE_ENV) {
  const configsDirectory = path.resolve(__dirname, './configs');
  const currentEnvironment = process.env.NODE_ENV.toLowerCase();

  const configFilePath = path.resolve(configsDirectory, `${currentEnvironment}.config.js`);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const environmentConfig = require(configFilePath);

  Object.keys(environmentConfig).forEach((element) => {
    newConfigs[element] = JSON.stringify(environmentConfig[element]);
  });
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
      },
    ],
  },
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      App: path.resolve(__dirname, './app/'),
      Components: path.resolve(__dirname, './app/components'),
      Contexts: path.resolve(__dirname, './app/contexts'),
      Pages: path.resolve(__dirname, './app/pages'),
      Hooks: path.resolve(__dirname, './app/hooks'),
      Store: path.resolve(__dirname, './app/store'),
      Routes: path.resolve(__dirname, './app/routes'),
      Assets: path.resolve(__dirname, './app/assets'),
      Utils: path.resolve(__dirname, './app/utilities'),
      Services: path.resolve(__dirname, './app/services'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': newConfigs,
    }),
  ],
};
