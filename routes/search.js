var get = require('get-json-plz')

var app = require('../app')

// We proxy the searches from reddit to avoid CORS issues.
app.use(function* (next) {
  if (this.path !== '/search')
    return yield* next

  if (!('q' in this.query))
    return this.redirect('/taylorswift')

  var term = this.query.q
  if (!term)
    this.error(400, 'search term required')

  this.body = yield* search(term)
})

function* search(term) {
  var json = yield get('http://www.reddit.com/subreddits/search.json?limit=10&q=' + term)

  return json && json.data.children.map(getData)
}

function getData(x) {
  return x.data
}