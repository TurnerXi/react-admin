import koaWebpack from 'koa-webpack'
import webpack from 'webpack'
import config from '../../webpack.config'

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
    const compiler = webpack(config)
    compiler.hooks.done.tap('load-resource', (stats) => {
      if (stats.hasErrors()) {
        console.log(stats.toString({ all: false, errors: true, colors: true }));
      }
    })
    return [
      koaWebpack({ compiler, ...options })
    ]
  }
}