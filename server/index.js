import Koa from 'koa';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import devConfig from './config/develop.config';
import proConfig from './config/product.config';
import routes from './routes';

const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig;

const app = new Koa();

config.init && config.init();

app.use(historyApiFallback({ whiteList: ['/api'] }));

if (config.middlewares) {
  config.middlewares().forEach(async middleware => {
    if (middleware instanceof Promise) {
      app.use(await middleware);
    } else {
      app.use(middleware);
    }
  });
}

app.use(routes.routes(), routes.allowedMethods());

app.listen(3000, () => {
  console.log('listening on 3000');
});
