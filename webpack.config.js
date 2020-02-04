var path = require('path')
var pathConf = require('./path.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [path.resolve(__dirname, './client/index.js')],
  output: {
    path: pathConf.distPath,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(css|less|sass)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: pathConf.template }),
    new CopyWebpackPlugin([pathConf.staticPath]),
    new ProgressBarPlugin({
      width: 100
    }),
    new CleanWebpackPlugin()
  ]
}