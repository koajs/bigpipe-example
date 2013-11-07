exports.asideAbout = function* () {
  var id = 'about'

  if (this.context.strategy === 'bigpipe') {
    this.push('<aside id="' + id + '" class="placeholder"></aside>')
    this.pagelets.push(function* () {
      var about = yield this.about
      if (!about)
        return this.arrive('#' + id, '404')

      this.arrive('#' + id, this._asideAbout(about))
    })
    return
  }

  var about = this.locals
    ? this.locals.about
    : yield this.about

  if (!about)
    return this.push('<aside id="' + id + '">404</aside>')

  this.push('<aside id="' + id + '">' + this._asideAbout(about) + '</aside>')
}

exports._asideAbout = function (data) {
  var uri = 'http://www.reddit.com/r/' + this.context.subreddit

  return '<h3><a href="' + uri + '" target="_blank">'
    + data.title + '</a></h3>'
    + '<dl>'
    + '<dt>Subscribers</dt>'
    + '<dd>' + data.subscribers + '</dd>'
    + '</dl>'
}