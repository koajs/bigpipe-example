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
  this.locals = yield {
    images: this.images,
    about: this.about,
    day: this.top('day'),
    week: this.top('week'),
    month: this.top('month'),
    year: this.top('year'),
    all: this.top('all')
  }
}