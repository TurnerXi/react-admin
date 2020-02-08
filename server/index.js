import Koa from 'koa';
import routes from './controller';
import { historyMiddleware, staticMiddleware, webpackMiddleware } from './middleware';

const isDev = process.env.NODE_ENV === 'development';
const isServerOnly = process.env.SERVER_ONLY === 'true';

async function main() {
  const app = new Koa();
  app.listen(3000, () => {
    console.log('listening on 3000');
  });

  app.use(historyMiddleware());
  if (isDev && !isServerOnly) {
    app.use(await webpackMiddleware());
  } else {
    app.use(staticMiddleware());
  }

  app.use(routes.routes(), routes.allowedMethods());
}

main();
