var select = require('select')
var request = require('superagent')

var search = select().label('Search Subreddits')

search
.on('search', function (term) {
  if (!term)
    return

  request
  .get('/search?q=' + term)
  .end(function (err, res) {
    if (res.status !== 200)
      return

    search.empty()

    var things = res.body
    if (!things.length)
      return

    things.forEach(function (thing) {
      search.add(thing.title, thing.display_name)
    })

    search.highlight(things[0].title)
  })
})
.on('select', function (option) {
  location.href = '/' + option.value + location.search
})

document.querySelector('#search').appendChild(search.el)