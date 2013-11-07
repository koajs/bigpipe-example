var raf = require('raf')
var classes = require('classes')

module.exports = BigPipe

function BigPipe(selector, html, js) {
  raf(function () {
    var el = document.querySelector(selector)
    classes(el).remove('placeholder')
    el.innerHTML = html
    if (js)
      new Function(js)()
  })
}

BigPipe.remove = function (selector) {
  raf(function () {
    var el = document.querySelector(selector)
    el.parentNode.removeChild(el)
  })
}