var http = require('http')

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