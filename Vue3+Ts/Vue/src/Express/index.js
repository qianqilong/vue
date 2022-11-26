// import express from 'express'
// eslint-disable-next-line no-undef
const express = require('express')
const app = express()
app.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  if (req.query.user === 'admin' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'Demo1',
          component: 'demo1.vue'
        },
        {
          path: '/demo2',
          name: 'Demo2',
          component: 'demo2.vue'
        },
        {
          path: '/demo3',
          name: 'Demo3',
          component: 'demo3.vue'
        }
      ]
    })
  } else if (req.query.user === 'admin1' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'Demo1',
          component: 'demo1.vue'
        },
        {
          path: '/demo2',
          name: 'Demo2',
          component: 'demo2.vue'
        }
      ]
    })
  } else {
    res.json({
      code: 400,
      message: '账号密码错误'
    })
  }
})
app.listen(9000)
