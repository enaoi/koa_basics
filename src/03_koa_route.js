const Koa = require("koa")
const Router = require("koa-router")

const app = new Koa()
const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = `<h1>Home</h1>`
})

const page = new Router()

page.get('/404', async (ctx) => {
  ctx.body = `<h1>404</h1>`
})

router.use('/page', page.routes(), page.allowedMethods())
// /page/404

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(3000, () => {
  console.log(`server is running at localhost:3000`)
})