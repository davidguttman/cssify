'use strict'

var test = require('tape-catch')
var css = require('./style.css')

test('browser: basic usage', function (t) {
  var position = window.getComputedStyle(document.body).position

  t.equal(css, 'body { position: absolute; }\n', 'styles exported')
  t.equal(position, 'absolute', 'styles injected')
  t.end()
})
