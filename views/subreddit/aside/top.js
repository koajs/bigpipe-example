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