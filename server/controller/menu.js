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

  const roots = data.filter(item => item.pid === 0);

  function recursive(parents) {
    for (let i = 0; i < parents.length; i++) {
      const item = parents[i];
      if (map[item.id]) {
        item.children = recursive(map[item.id]);
      }
    }
    return parents;
  }

  ctx.body = recursive(roots);
});

router.get('/', async ctx => {
  ctx.body = await menuService.list();
});

router.get('/:id', async ctx => {
  ctx.body = await menuService.get(ctx.params.id);
});

router.put('/', async ctx => {
  ctx.body = await menuService.create(ctx.request.body);
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
