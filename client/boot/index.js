window.BigPipe = require('big-pipe')

deferred.forEach(function (fn) {
  fn()
})

deferred = null