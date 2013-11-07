var View = module.exports = require('../../view').extend()

View.mixin(require('./aside'))
View.mixin(require('./aside/about'))
View.mixin(require('./aside/top'))
View.mixin(require('./grid'))
View.mixin(require('./query'))

View.prototype.render = function* () {
  this.head()

  if (this.context.strategy === 'parallel')
    yield this.query

  yield this.body

  yield this.tail
}

View.prototype.body = function* () {
  this.push('<div id="search"></div>')
  this.push('<div id="container">')

  yield this.grid

  this.push('<div id="sidebar">')

  yield this.aside('about')
  yield this.aside('strategies')
  yield this.aside('top', 'day')
  yield this.aside('top', 'week')
  yield this.aside('top', 'month')
  yield this.aside('top', 'year')
  yield this.aside('top', 'all')

  this.push('</div>')

  this.push('</div>')
}

// Execute all queries in parallel
// NEED ES6 DESTRUCTURING
View.prototype.query = function* () {
  var out = yield [
    this.images,
    this.about,
    this.top('day'),
    this.top('week'),
    this.top('month'),
    this.top('year'),
    this.top('all'),
  ]

  this.locals = {
    images: out[0],
    about: out[1],
    day: out[2],
    week: out[3],
    month: out[4],
    year: out[5],
    all: out[6]
  }
}