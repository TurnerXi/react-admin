/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router = new Router();

const files = fs.readdirSync(__dirname);
files
  .filter(file => file.match(/^[^\.]*.\.js$/))
  .forEach(async file => {
    const filename = file.substr(0, file.length - 3);
    if (filename !== 'index') {
      const { default: routes } = require(path.join(__dirname, file));
      router.use(`/api/${filename}`, routes.routes(), routes.allowedMethods());
    }
  });

export default router;
