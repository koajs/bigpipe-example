var app = require('../app')
var View = require('../views').subreddit

app.use(function* (next) {
  var match = /^\/(\w+)$/.exec(this.path)
  if (!match)
    return yield next

  this.subreddit = match[1]
  this.title = '/r/' + this.subreddit
  this.strategy = 'bigpipe' in this.query ? 'bigpipe'
    : 'parallel' in this.query ? 'parallel'
    : 'sequential'

  new View(this)
})