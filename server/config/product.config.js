import serve from 'koa-static'
import path from 'path'
import webpack from 'webpack'
import config from '../../webpack.config'
export default {
  init() {
    setTimeout(function () {
      const compiler = webpack(Object.assign({ stats: 'normal' }, config))
      compiler.run((err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.hasErrors()) {
          console.log(stats.toString({ all: false, errors: true, colors: true }));
        }
      })
    }, 100)
  },
  middlewares() {
    const staticServe = serve(path.resolve(__dirname, '../webapp'))
    return [
      staticServe
    ]
  }
}