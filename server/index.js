import Koa from 'koa'
import devConfig from './config/develop.config'
import proConfig from './config/product.config'
const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

const app = new Koa();

config.init && config.init()
config.middlewares && config.middlewares().forEach(async (middleware) => {
  if (middleware instanceof Promise) {
    app.use(await middleware)
  } else {
    app.use(middleware)
  }
})

app.listen(3000, () => {
  console.log('listening on 3000');
})
