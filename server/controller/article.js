import KoaRouter from 'koa-router';
import articleService from '../service/article';

const router = new KoaRouter();

router.get('/', async ctx => {
  ctx.body = await articleService.list(ctx.query);
});

router.get('/:id', async ctx => {
  ctx.body = await articleService.get(ctx.params.id);
});

router.put('/', async ctx => {
  ctx.body = await articleService.create(ctx.request.body);
});

router.post('/', async ctx => {
  await articleService.update(ctx.request.body);
  ctx.body = 'success';
});

router.delete('/:id', async ctx => {
  await articleService.remove(ctx.params.id);
  ctx.body = 'success';
});

export default router;
