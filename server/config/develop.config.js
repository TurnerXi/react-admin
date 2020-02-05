import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
import pathConf from '../../path.config';

// eslint-disable-next-line import/no-dynamic-require
const webpackConf = require(pathConf.webpackConfPath);

const options = {
  devMiddleware: {
    publicPath: '/',
    logLevel: 'silent'
  },
  hotClient: {
    logLevel: 'silent'
  }
};

export default {
  middlewares() {
    const compiler = webpack(webpackConf);
    compiler.hooks.done.tap('load-resource', stats => {
      if (stats.hasErrors()) {
        console.log(stats.toString({ all: false, errors: true, colors: true }));
      }
    });
    return [koaWebpack({ compiler, ...options })];
  }
};
