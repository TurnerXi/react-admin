const path = require('path');
const webpack = require('webpack');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// let { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const pathConf = require('./path.config');
const resolve = dir => path.resolve(__dirname, dir);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const jsRegex = /\.(js|mjs|jsx|ts|tsx)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize(),
        ],
        sourceMap: false,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: false,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  devtool: 'cheap-source-map',
  stats: 'errors-only',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    resolve('./client/index.js'),
  ].filter(Boolean),
  output: {
    path: pathConf.distPath,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
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
    modules: [resolve('node_modules')],
    alias: {
      '@': resolve('client'),
    },
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre', // 确保在babel之前处理js
        include: resolve('client'),
        use: [
          {
            options: {
              cache: true, // eslint cache
              formatter: require.resolve('react-dev-utils/eslintFormatter'), // react eslint formatter
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
              useEslintrc: true,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        // 配置所有文件类型处理规则，无匹配项则使用file-loader处理
        oneOf: [
          // url-loader类似filter-loader，但当文件小于limit时，则将图片转换为data url，避免发起请求
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: jsRegex,
            include: resolve('client'),
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              babelrc: false,
              configFile: false,
              presets: [require.resolve('babel-preset-react-app')],
              cacheIdentifier: getCacheIdentifier('development', [
                'babel-plugin-named-asset-import',
                'babel-preset-react-app',
                'react-dev-utils',
                'react-scripts',
              ]),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]', //?
                      },
                    },
                  },
                ],
                [
                  require.resolve('babel-plugin-import'),
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css',
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          // 处理app以外的js，例node_modules
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }],
              ],
              cacheDirectory: true,
              cacheCompression: true,
              cacheIdentifier: getCacheIdentifier('development', [
                'babel-plugin-named-asset-import',
                'babel-preset-react-app',
                'react-dev-utils',
                'react-scripts',
              ]),
              sourceMaps: true,
              inputSourceMap: true,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false,
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: false,
              },
              'sass-loader'
            ),
            sideEffects: true,
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: false,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              'sass-loader'
            ),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [jsRegex, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // only package third parties that are initially dependent
        },
        antd: {
          name: 'chunk-antd', // split antd into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?antd(.*)/, // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('client/assets'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ template: pathConf.template }),
    new ModuleNotFoundPlugin(resolve('client')),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(resolve('node_modules')),
    new ProgressBarPlugin({
      width: 100,
    }),
  ],
});
