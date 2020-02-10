import KoaRouter from 'koa-router';
import menuService from '../service/menu';

const router = new KoaRouter();

router.get('/tree', async ctx => {
  const data = await menuService.list();
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
  ctx.body = await menuService.list();
});

router.get('/:id', async ctx => {
  ctx.body = await menuService.get(ctx.params.id);
});

router.put('/', async ctx => {
  await menuService.create(ctx.request.body);
  ctx.body = 'success';
});

router.post('/', async ctx => {
  await menuService.update(ctx.request.body);
  ctx.body = 'success';
});

router.delete('/:id', async ctx => {
  await menuService.remove(ctx.params.id);
  ctx.body = 'success';
});

export default router;
