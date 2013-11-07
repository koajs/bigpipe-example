var fs = require('fs')
var path = require('path')
var util = require('util')
var merge = require('merge-descriptors')
var co = require('co')
var Readable = require('stream').Readable

util.inherits(View, Readable)

module.exports = View

View.extend = function () {
  function View(context) {
    this.initialize(context)
  }

  util.inherits(View, this)

  Object.keys(this).forEach(function (key) {
    View[key] = this[key]
  }, this)

  return View
}

View.mixin = function (obj) {
  merge(this.prototype, obj)
  return this
}

function View(context) {
  this.initialize(context)
}

View.prototype.initialize = function (context) {
  Readable.call(this)

  this.context = context
  this.pagelets = []
  this.scripts = []

  context.type = 'html'
  context.body = this
  co.call(this, this.render)(context.onerror)
}

var head = fs.readFileSync(path.join(__dirname, 'head.html'), 'utf8')

View.prototype.head = function () {
  this.push('<!DOCTYPE html><html>')
  this.push(head.replace('{{title}}', this.context.title))
  this.push('<body>')
}

View.prototype.tail = function* () {
  this.push('<script src="/example.js"></script>')

  // Push the pagelets
  if (this.pagelets.length)
    yield this.pagelets

  this.push('</body></html>')
  this.push(null)
}

// Defer executing a script until after `build.js` is executed.
View.prototype.defer = function (script) {
  this.push('<script>defer(new Function(' + JSON.stringify(script) + '));</script>')
}

View.prototype.arrive = function (selector, html, js) {
  this.push('<script>BigPipe('
    + JSON.stringify(selector) + ', '
    + JSON.stringify(html)
    + (js ? ', ' + JSON.stringify(js) : '') + ');'
    + '</script>'
  )
}

View.prototype._read = function noop() {}