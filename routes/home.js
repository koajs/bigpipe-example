var app = require('../app')

app.use(function* (next) {
  if (this.path === '/')
    this.redirect('/taylorswift')
  else
    yield next
})