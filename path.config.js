const path = require('path')
module.exports = {
  webpackConfPath: path.resolve(__dirname, 'webpack.config.js'),
  distPath: path.resolve(__dirname, 'webapp'),
  clientPath: path.resolve(__dirname, 'client'),
  staticPath: path.resolve(__dirname, 'static'),
  template: path.resolve(__dirname, 'client/index.html')
}