exports.aside = function* (type, time) {
  switch (type) {
    case 'top':
      return yield this.asideTop(time)
    case 'about':
      return yield this.asideAbout()
  }
}

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

  this.push('<aside id="' + id + '>' + this._asideAbout(about) + '</aside>')
}

exports.asideTop = function* (time) {
  var id = 'top-' + time

  if (this.context.strategy === 'bigpipe') {
    this.push('<aside id="' + id + '" class="placeholder"></aside>')
    this.pagelets.push(function* () {
      var posts = yield this.top(time)
      if (!posts)
        return this.arrive('#' + id, '404')
      if (!posts.length)
        return this.arrive('#' + id, 'empty')

      var html = this._asideTop(time, posts)
      this.arrive('#' + id, html)
    })
    return
  }

  var posts = this.locals
    ? this.locals[time]
    : yield this.top(time)

  if (!posts)
    return this.push('<aside id="' + id + '">404</aside>')
  if (!posts.length)
    return this.push('<aside id="' + id + '">empty</aside>')

  var html = this._asideTop(time, posts)
  this.push('<aside id="' + id + '">' + html + '</aside>')
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

var topTitle = {
  day: 'Top 5 Posts Today',
  week: 'Top 5 Posts This Week',
  month: 'Top 5 Posts This Month',
  year: 'Top 5 Posts This Year',
  all: 'Top 5 Posts Ever'
}

exports._asideTop = function (time, posts) {
  return '<h3><a href="http://www.reddit.com/r/'
    + this.context.subreddit + '/top/?sort=top&amp;t=' + time + '" '
    + 'target="_blank">'
    + topTitle[time]
    + '</h3>'
    + '<ul>'
    + posts.map(this._asideTopPost, this).join('')
    + '</ul>'
}

exports._asideTopPost = function (post) {
  return '<li><a href="http://www.reddit.com'
    + post.data.permalink + '" '
    + 'target="_blank">'
    + post.data.title
    + '</a></li>'
}