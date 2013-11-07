/*

  Note: I would actually put this in `client/` as a function and call it. It's just here to demonstrate a "pagelet".
  i.e. `BigPipe.arrive('#grid', html); window.buildGrid();`

*/

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