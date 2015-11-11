'use strict'

const test = require('tape-catch')
const browserify = require('browserify')
const path = require('path')
const cssify = require('../../lib')

test('main module', t => {
  t.doesNotThrow(() => {
    browserify(path.join(__dirname, '..', 'browser', 'index.js'))
      .transform(cssify)
      .bundle()
      .on('end', t.end)
  })
})
