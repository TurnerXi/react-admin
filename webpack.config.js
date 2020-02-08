let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let pathConf = require('./path.config');

module.exports = {
  devtool: '#eval-source-map',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [path.resolve(__dirname, './client/index.js')],
  output: {
    path: pathConf.distPath,
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|less|sass)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: pathConf.template }),
    new CopyWebpackPlugin([pathConf.staticPath]),
    new ProgressBarPlugin({
      width: 100,
    }),
    new CleanWebpackPlugin(),
  ],
};
