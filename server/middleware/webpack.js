import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
import webpackConf from '../../webpack.config';

const options = {
  devMiddleware: {
    publicPath: '/',
    logLevel: 'silent',
  },
  hotClient: {
    logLevel: 'silent',
  },
};

export default async function webpackMiddleware() {
  const compiler = webpack(webpackConf);
  compiler.hooks.done.tap('load-resource', stats => {
    if (stats.hasErrors()) {
      console.log(stats.toString({ all: false, errors: true, colors: true }));
    }
  });
  return await koaWebpack({ compiler, ...options });
}
