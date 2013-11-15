var koa = require('koa')
var path = require('path')

var app = module.exports = koa()

app.use(require('koa-favicon')())

if (process.env.NODE_ENV !== 'test')
  app.use(require('koa-logger')())

app.use(require('koa-compress')({
  // Required for streaming to work in Chrome
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(require('koa-static')(path.join(__dirname, 'build')))