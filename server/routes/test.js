import Router from 'koa-router';

const router = new Router();

router.get('/abc', ({ response }) => {
  response.body = 'hah';
});

export default router;
