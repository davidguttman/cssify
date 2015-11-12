'use strict'

var through = require('through')
var processCss = require('./process-css')
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
      processCss(fileName, source, opts).then(moduleSource => {
        this.queue(moduleSource)
        this.queue(null)
      })
    }
  )
}
