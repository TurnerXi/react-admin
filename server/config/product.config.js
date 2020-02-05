import serve from 'koa-static';
import path from 'path';
import webpack from 'webpack';
import pathConf from '../../path.config';

// eslint-disable-next-line import/no-dynamic-require
const webpackConf = require(pathConf.webpackConfPath);

export default {
  init() {
    setTimeout(() => {
      const compiler = webpack({ stats: 'normal', ...webpackConf });
      compiler.run((err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.hasErrors()) {
          console.log(stats.toString({ all: false, errors: true, colors: true }));
        }
      });
    }, 100);
  },
  middlewares() {
    const staticServe = serve(path.resolve(__dirname, pathConf.distPath));
    return [staticServe];
  }
};
