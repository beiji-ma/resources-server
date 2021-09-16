const { query } = require('express')
const Router = require('koa-router')
var router = new Router()
const DB = require('../modules/mysql')


router.get('/', async (ctx) => {
  // console.log(ctx.request.query)

  let condition = []
  let current_page = 1
  let pagesize = 10
  let total = 0
  // if (ctx.request.query.total === '0') {
  total = await DB.count('select count(*) as count from book', [])
  // }


  if (ctx.request.query.pagesize !== undefined && ctx.request.query.pagesize !== '') {
    pagesize = parseInt(ctx.request.query.pagesize)
  }

  if (ctx.request.query.pagenum !== undefined && ctx.request.pagenum !== '') {
    current_page = parseInt(ctx.request.query.pagenum)
  }

  let sql = 'select * from book limit ' + pagesize + ' offset ' + pagesize * (current_page - 1)

  let list = []
  msg = 'KO'
  statusCode = 200
  try {
    list = await DB.list(sql, [...condition])
  } catch (error) {
    // console.log(error)
    msg = 'KO'
    statusCode = 204
  }

  ctx.body = {
    "data": {
      "pagenum": 1,
      'total': total[0].count,
      'books': list
    },
    "meta": {
      "msg": msg,
      "status": statusCode
    }
  }

})

module.exports = router;