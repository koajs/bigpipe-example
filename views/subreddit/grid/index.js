var fs = require('fs')
var path = require('path')

var pagelet = {
  css: '<style scoped>' + fs.readFileSync(path.join(__dirname, 'pagelet.css'), 'utf8') + '</style>',
  js: fs.readFileSync(path.join(__dirname, 'pagelet.js'), 'utf8'),
  spinner: fs.readFileSync(path.join(__dirname, 'spinner.html'), 'utf8')
}

exports.grid = function* () {
  if (this.context.strategy === 'bigpipe') {
    this.push('<div id="grid">' + pagelet.spinner + '</div>')

    this.pagelets.push(function* () {
      var images = yield this.images
      if (!images || !images.length)
        return this.arrive('#grid', this.alert('info', '<p>No images to view.</p>'))

      var html = '<div id="grid-inner">'
        + images.map(this.gridElement, this).join('')
        + '</div>'
      this.arrive('#grid', html + pagelet.css, pagelet.js)
    })
    return
  }

  var images = this.locals
    ? this.locals.images
    : yield this.images

  if (!images || !images.length)
    return this.push('<div id="grid">'
      + this.alert('info', '<p>No images to view.</p>')
      + '</div>'
    )

  var html = images.map(this.gridElement, this).join('')
  this.push('<div id="grid"><div id="grid-inner">' + html + '</div>' + pagelet.css + '</div>')
  this.defer(pagelet.js)
}

exports.gridElement = function (image) {
  return '<a href="http://www.reddit.com' + image.permalink + '" '
    + 'target="_blank" '
    + 'data-width="' + image.width + '" '
    + 'data-height="' + image.height + '">'
    + '<img src="http://i.imgur.com/' + image.hash + 'l' + image.ext + '">'
    + '</a>'
}