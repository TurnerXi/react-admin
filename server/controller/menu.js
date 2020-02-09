import KoaRouter from 'koa-router';
import { list, detail } from '../service/menu';

const router = new KoaRouter();

router.get('/tree', async ctx => {
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

router.get('/', async ctx => {
  ctx.body = await list();
});

router.get('/:id', async ctx => {
  ctx.body = await detail(ctx.params.id);
});

router.post('/', async ctx => {
  ctx.body = ctx.request.body;
});

export default router;
