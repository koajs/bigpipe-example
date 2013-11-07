var raf = require('raf')
var classes = require('classes')

module.exports = BigPipe

// Replace an element's innerHTML with `html`.
// Optionally execute `js` in its own closure.
// `raf`d to prevent any unnecessary reflows.
// Removes the `.placeholder` class.
function BigPipe(selector, html, js) {
  raf(function () {
    var el = document.querySelector(selector)
    classes(el).remove('placeholder')
    el.innerHTML = html
    if (js)
      new Function(js)()
  })
}

// Remove an element based on a selector.
BigPipe.remove = function (selector) {
  raf(function () {
    var el = document.querySelector(selector)
    el.parentNode.removeChild(el)
  })
}