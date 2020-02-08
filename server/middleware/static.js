import serve from 'koa-static';
import path from 'path';
import pathConf from '../../path.config';

export default function staticMiddleware() {
  return serve(path.resolve(__dirname, pathConf.distPath));
}
