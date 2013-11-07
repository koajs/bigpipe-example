var app = require('../app')
var get = require('../lib').get

app.use(function (next) { return function* () {
  if (this.path !== '/search')
    return yield next

  var term = this.query.q
  if (!term)
    this.error(400, 'search term required')

  this.body = yield search(term)
}})

function* search(term) {
  var json = yield get('http://www.reddit.com/subreddits/search.json?limit=10&q=' + term)

  return json && json.data.children.map(getData)
}

function getData(x) {
  return x.data
}