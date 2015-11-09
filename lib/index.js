'use strict'

var through = require('through')
var processCss = require('./processCss')
var options = require('./options')

module.exports = function (fileName, opts) {
  opts = options.normalize(opts)

  if (options.skipIt(fileName, opts)) return through()

  var source = ''

  return through(
    function (chunk) {
      source += chunk
    },
    function () {
      this.queue(processCss(fileName, source, opts))
      this.queue(null)
    }
  )
}
