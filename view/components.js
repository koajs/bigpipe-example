// Anything not related to the constructor or BigPipe go here.

var fs = require('fs')
var path = require('path')

var head = fs.readFileSync(path.join(__dirname, 'head.html'), 'utf8')

exports.head = function () {
  this.push('<!DOCTYPE html><html>')
  this.push(head.replace('{{title}}', this.context.title))
  this.push('<body>')
}

exports.alert = function (type, html) {
  return '<div class="alert alert-' + type + '">'
    + html
    + '</div>'
}