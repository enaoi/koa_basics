const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const app = new Koa()



let map = new Map()
map.set('/', 'index.html')
map.set('/index', 'index.html')
map.set('/404', '404.html')

const render = (page) => {
  return new Promise((resolve, reject) => {
    let url = `../static/${page}`
    fs.readFile(path.resolve(__dirname, url), "utf8", (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })

}

const route = (url) => {
  let view = '404.html'
  if (map.has(url)) {
    view = map.get(url)
  }
  return render(view)
}

app.use(async (ctx) => {
  let url = ctx.request.url;
  let html = await route(url)
  ctx.body = html
})

app.listen(3000, () => {
  console.log(`server is running at port 3000`)
})