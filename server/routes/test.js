import Router from 'koa-router'
const router = new Router()

router.get('/abc', ({ request, response }) => {
  response.body = "hah"
})

export default router