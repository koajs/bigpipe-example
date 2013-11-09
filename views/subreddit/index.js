var View = module.exports = require('../../view').extend()

View.context(require('./aside'))
View.context(require('./aside/about'))
View.context(require('./aside/top'))
View.context(require('./grid'))
View.context(require('./query'))

View.prototype.render = function* () {
  this.head()

  // We execute the queries in parallel _after_
  // flushing the <head> to the client so the client
  // can at least download the <style> while s/he waits.
  if (this.context.strategy === 'parallel')
    yield* this.query()

  yield* this.body()

  yield* this.tail()
}

View.prototype.body = function* () {
  this.push('<div id="search"></div>')
  this.push('<div id="container">')

  yield* this.grid()

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

// Execute all queries in parallel.
// This is inconvenient because it requires you to
// know what queries to execute _before_ you render the template.
// Future: this.locals = yield {}
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