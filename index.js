const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
// const path = require('path')

const users = require('./routes/users')

var app = new Koa()

app.use(cors())

var router = new Router()

// config router
router.use('/users', users.routes())

// start router
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(4000, () => console.log(`Server is running at http://localhost:4000`))