const express = require('express')
//用于解决路由 history问题提交服务器的中间件

const history = require('connect-history-api-fallback')

const app = express();

app.use(history())
app.use(express.static(__dirname+'/dist'))

app.listen(80, err => {
  if (!err) console.log('success');
})