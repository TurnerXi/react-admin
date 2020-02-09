import KoaRouter from 'koa-router';
import userService from '../service/user';

const router = new KoaRouter();

router.get('/', async ctx => {
  ctx.body = await userService.list();
});

router.get('/:id', async ctx => {
  ctx.body = await userService.get(ctx.params.id);
});

router.put('/', async ctx => {
  await userService.create(ctx.request.body);
  ctx.body = 'success';
});

router.post('/', async ctx => {
  await userService.update(ctx.request.body);
  ctx.body = 'success';
});

router.delete('/:id', async ctx => {
  await userService.remove(ctx.params.id);
  ctx.body = 'success';
});

export default router;
