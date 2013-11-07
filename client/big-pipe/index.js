var raf = require('raf')
var classes = require('classes')

module.exports = function (selector, html, js) {
  raf(function () {
    var el = document.querySelector(selector)
    classes(el).remove('placeholder')
    el.innerHTML = html
    if (js)
      new Function(js)()
  })
}