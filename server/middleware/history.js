import historyApiFallback from 'koa2-connect-history-api-fallback';

export default function historyMiddleware() {
  return historyApiFallback({ whiteList: ['/api'] });
}
