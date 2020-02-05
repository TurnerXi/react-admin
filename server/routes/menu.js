import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/list', ctx => {
  ctx.body = '123';
});

export default router;
