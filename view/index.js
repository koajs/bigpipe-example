var fs = require('fs')
var path = require('path')
var util = require('util')
var merge = require('merge-descriptors')
var co = require('co')
var Readable = require('stream').Readable

// View is a readable stream that is piped to the response.
util.inherits(View, Readable)

module.exports = View

// Creates a new instance of `View`.
// This way, the prototype is not butchered.
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

// Merge in an object into the View's prototype.
// Makes it easier to define properties.
// ie View.mixin(require('./stuff'))
// where stuff is defined like `exports.thing = function () {}`
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

  // We have to call `co` here because
  // the context here is different.
  // We also want it to execute as a distinct coroutine.
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

  // Push the pagelets after `example.js` is send to the client
  if (this.pagelets.length)
    yield this.pagelets

  this.push('</body></html>')
  this.push(null)
}

// Defer executing a script until after the `example.js` is executed.
View.prototype.defer = function (script) {
  this.push('<script>defer(function(){' + script + '});</script>')
}

// Replace the contents of `selector` with `html`.
// Optionally execute the `js`.
View.prototype.arrive = function (selector, html, js) {
  this.push('<script>BigPipe('
    + JSON.stringify(selector) + ', '
    + JSON.stringify(html)
    + (js ? ', ' + JSON.stringify(js) : '') + ');'
    + '</script>'
  )
}

// Remove the element from the layout,
// specifically when it's a placeholder that must be removed.
View.prototype.remove = function (selector) {
  this.push('<script>BigPipe.remove('
    + JSON.stringify(selector)
    + ');</script>'
  )
}

View.prototype.alert = function (type, html) {
  return '<div class="alert alert-' + type + '">'
    + html
    + '</div>'
}

View.prototype._read = function noop() {}