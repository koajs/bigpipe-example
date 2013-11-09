var humanize = require('humanize-number')

exports.asideAbout = function* () {
  var id = 'about'

  if (this.context.strategy === 'bigpipe') {
    this.push('<aside id="' + id + '" class="placeholder"></aside>')
    this.pagelets.push(function* () {
      var about = yield this.about
      if (!about)
        return this.remove('#' + id)

      this.arrive('#' + id, this._asideAbout(about))
    })
    return
  }

  var about = this.locals
    ? this.locals.about
    : yield this.about

  if (!about)
    return

  this.push('<aside id="' + id + '">' + this._asideAbout(about) + '</aside>')
}

// I really wanted to add more info,
// but I gave up on the reddit API.
exports._asideAbout = function (data) {
  var uri = 'http://www.reddit.com/r/' + this.context.subreddit

  return '<h3><a href="' + uri + '" target="_blank">'
    + data.title + '</a></h3>'
    + '<dl>'
    + '<dt>Subscribers</dt>'
    + '<dd>' + humanize(data.subscribers || 0) + '</dd>'
    + '</dl>'
}