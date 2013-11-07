var http = require('http')

// Easy way to GET the JSON response of a URL.
// Works with `yield` as well as with a normal callback.
// var json = yield get('http://hostname.com/data.json')
module.exports = function (uri, done) {
  var req = http.get(uri, function (res) {
    if (res.statusCode !== 200)
      return done()

    var body = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      body += chunk
    })
    res.once('end', function () {
      done(null, JSON.parse(body))
    })
  })

  if (done)
    req.once('error', done)

  return function (fn) {
    req.once('error', done = fn)
  }
}