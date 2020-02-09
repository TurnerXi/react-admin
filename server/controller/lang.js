import KoaRouter from 'koa-router';
import langService from '../service/lang';

const router = new KoaRouter();

router.get('/', async ctx => {
  ctx.body = await langService.list();
});

router.get('/:id', async ctx => {
  ctx.body = await langService.get(ctx.params.id);
});

router.put('/', async ctx => {
  await langService.create(ctx.request.body);
  ctx.body = 'success';
});

router.post('/', async ctx => {
  await langService.update(ctx.request.body);
  ctx.body = 'success';
});

router.delete('/:id', async ctx => {
  await langService.remove(ctx.params.id);
  ctx.body = 'success';
});

export default router;
