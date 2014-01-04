var app = module.exports = require('./app')

require('./routes/home')
require('./routes/search')
require('./routes/subreddit')

if (!module.parent) {
  var spdy = require('spdy')
  var fs = require('fs')
  var port = process.env.PORT || 3456

  app.listen(port, function (err) {
    if (err)
      throw err

    console.log('BigPipe example listening on port ' + port)
  })

  spdy.createServer({
    key: fs.readFileSync('keys/spdy-key.pem'),
    cert: fs.readFileSync('keys/spdy-cert.pem'),
    ca: fs.readFileSync('keys/spdy-csr.pem')
  }, app.callback()).listen(port + 1, function (err) {
    if (err)
      throw err

    console.log('BigPipe SPDY/HTTPS example listening on port ' + (port + 1))
  })
}