var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [path.resolve(__dirname, './client/index.js')],
  output: {
    path: path.resolve(__dirname, 'webapp'),
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
        use: 'babel-loader'
      },
      {
        test: /\.(css|less|sass)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'static/index.html' }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      ignore: ['index.html'],
      to: 'public'
    }]),
    new ProgressBarPlugin({
      width: 100
    }),
    new CleanWebpackPlugin()
  ]
}