var get = require('get-json-plz')

exports.images = function* () {
  var json = yield get('http://imgur.com/r/'
    + this.context.subreddit
    + '.json'
  )

  return json && json.data
}

exports.top = function* (time) {
  var json = yield get('http://www.reddit.com/r/'
    + this.context.subreddit
    + '/top.json?sort=top&t='
    + time + '&limit=5'
  )

  return json && json.data.children
}

exports.about = function* () {
  var json = yield get('http://www.reddit.com/r/'
    + this.context.subreddit
    + '/about.json'
  )

  return json && json.data
}