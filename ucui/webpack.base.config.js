const webpack = require('webpack')
const path = require('path')

let newConfigs = {}

if (process.env.NODE_ENV) {
  const configsDirectory = path.resolve(__dirname, './configs')
  const currentEnvironment = process.env.NODE_ENV.toLowerCase()

  const configFilePath = path.resolve(configsDirectory, `${currentEnvironment}.config.js`)
  const environmentConfig = require(configFilePath)

  Object.keys(environmentConfig).map(element => {
    newConfigs[element] = JSON.stringify(environmentConfig[element])
  })
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    crossOriginLoading: 'use-credentials'
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
      Utils: path.resolve(__dirname, 'app/utilities')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': newConfigs
    })
  ]
}
