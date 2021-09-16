const jwt = require('express-jwt')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(jwt({
  secret: 'secret', algorithms: ['HS256']
}).unless({
  path: ['/login', 'signup']
}))

app.use(cors())

// 初始化统一响应机制
var resextra = require('./modules/resextra')
app.use(resextra)

app.get('/welcome', function (req, res) {
  res.send(200, req.user)
})

app.listen(4000, () => console.log(`Server is running at http://localhost:4000`))