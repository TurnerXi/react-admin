import KoaRouter from 'koa-router';
import { list } from '../service/menu';

const router = new KoaRouter();

router.get('/list', async ctx => {
  const data = await list();
  const map = {};
  data.forEach(item => {
    if (item.pid !== 0) {
      map[item.pid] = map[item.pid] || [];
      map[item.pid].push(item);
    }
  });

  ctx.body = data
    .filter(item => item.pid === 0)
    .map(item => {
      item.children = map[item.id];
      return item;
    });
});

export default router;
