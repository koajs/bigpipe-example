window.BigPipe = require('big-pipe')

require('search')

deferred.forEach(function (fn) {
  fn()
})

deferred = null