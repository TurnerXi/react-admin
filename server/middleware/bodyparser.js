import bodyParser from 'koa-bodyparser';

export default function bodyParserMiddleware() {
  return bodyParser();
}
