var app = require('../app')

app.use(function (next) { return function* () {
  if (this.path === '/')
    this.redirect('/taylorswift')
  else
    yield next
}})