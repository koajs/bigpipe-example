var koa = require('koa')

var app = module.exports = koa()

app.use(require('koa-favicon')())
app.use(require('koa-logger')())
app.use(require('koa-compress')({
  flush: require('zlib').Z_SYNC_FLUSH
}))