let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
let pathConf = require('./path.config');

module.exports = {
  devtool: '#eval-source-map',
  stats: 'errors-only',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [path.resolve(__dirname, './client/index.js')],
  output: {
    path: pathConf.distPath,
    filename: 'js/[name].[hash:8].bundle.js',
    chunkFilename: 'js/[id].[hash:8].chunk.js',
    publicPath: '/',
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
  optimization: {
    splitChunks: {
      minSize: 30000,
      maxSize: 250000,
      cacheGroups: {
        antd: {
          name: 'antd',
          chunks: 'all',
          priority: 10,
          test: /antd|ant-design|rc-/,
        },
        libs: {
          name: 'libs',
          chunks: 'all',
          priority: 9,
          test: /babel-polyfill|\/react\/|react-dom|react-router-dom|mobx|lodash/,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css|scss)$/,
          chunks: 'async',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
          priority: 8,
        },
        async: {
          name: 'async',
          chunks: 'async',
          minChunks: 2,
          reuseExistingChunk: true,
          priority: 7,
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ template: pathConf.template }),
    new CopyWebpackPlugin([pathConf.staticPath]),
    new ProgressBarPlugin({
      width: 100,
    }),
    new CleanWebpackPlugin(),
  ],
};
