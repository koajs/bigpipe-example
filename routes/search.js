var http = require('http')

var app = require('../app')

app.use(function (next) { return function* () {
  if (this.path !== '/search')
    return yield next

  var term = this.query.q
  if (!term)
    this.error(400, 'search term required')

  this.body = yield search(term)
}})

function search(term, done) {
  var uri = 'http://www.reddit.com/subreddits/search.json?limit=3&q=' + term

  var req = http.get(uri, function (res) {
    if (res.statusCode !== 200)
      return done(null, false)

    var body = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      body += chunk
    })
    res.once('end', function () {
      done(null, JSON.parse(body).data.children)
    })
  })

  if (done)
    req.once('error', done)

  return function (fn) {
    req.once('error', done = fn)
  }
}