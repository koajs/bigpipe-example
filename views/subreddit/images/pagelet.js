var Pack = require('jonathanong-horizontal-grid-packing')
var raf = require('component-raf')

var container = document.querySelector('#grid-inner')

var pack = window.pack = new Pack(container, {
  padding: 5
})

window.addEventListener('resize', function () {
  raf(reload)
})

function reload() {
  pack.width = container.clientWidth
  pack.height = Math.round(window.innerHeight / Math.PI)
  pack.reload()
}