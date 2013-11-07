var http = require('http')

exports.images = function (done) {
  var uri = 'http://imgur.com/r/' + this.context.subreddit + '.json'

  var req = http.get(uri, function (res) {
    if (res.statusCode !== 200)
      return done(null, false)

    var body = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      body += chunk
    })
    res.once('end', function () {
      done(null, JSON.parse(body).data)
    })
  })

  if (done)
    req.once('error', done)

  return function (fn) {
    req.once('error', done = fn)
  }
}

exports.top = function (time, done) {
  var uri = 'http://www.reddit.com/r/' + this.context.subreddit + '/top.json?sort=top&t=' + time + '&limit=5'

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

exports.about = function (done) {
  var uri = 'http://www.reddit.com/r/' + this.context.subreddit + '/about.json'

  var req = http.get(uri, function (res) {
    if (res.statusCode !== 200)
      return done(null, false)

    var body = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      body += chunk
    })
    res.once('end', function () {
      done(null, JSON.parse(body).data)
    })
  })

  if (done)
    req.once('error', done)

  return function (fn) {
    req.once('error', done = fn)
  }
}