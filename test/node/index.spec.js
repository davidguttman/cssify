'use strict'

var test = require('tape-catch')
var browserify = require('browserify')
var path = require('path')
var cssify = require('../../lib')

test('main module', function (t) {
  t.doesNotThrow(function () {
    browserify(path.join(__dirname, '..', 'browser', 'index.js'))
      .transform(cssify)
      .bundle()
      .on('end', t.end)
  })
})
