import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/list', ctx => {
  ctx.body = [
    {
      path: '/charts',
      component: '/charts',
      icon: 'chart',
      title: '图表',
    },
  ];
});

export default router;
