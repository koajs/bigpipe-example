var fs = require('fs')
var path = require('path')

var strategies = fs.readFileSync(path.join(__dirname, 'strategies.html'), 'utf8')

exports.aside = function* (type, time) {
  switch (type) {
    case 'top':
      return yield* this.asideTop(time)
    case 'about':
      return yield* this.asideAbout()
    case 'strategies':
      return this.push(strategies)
  }
}