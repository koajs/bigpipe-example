var app = module.exports = require('./app')

require('./routes/home')
require('./routes/search')
require('./routes/subreddit')

if (!module.parent) {
  var port = process.env.PORT || 3456
  app.listen(port, function (err) {
    if (err)
      throw err

    console.log('BigPipe example listening on port ' + port)
  })
}