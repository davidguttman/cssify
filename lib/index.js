'use strict'

const through = require('through2')
const processCss = require('./process-css')
const options = require('./options')

module.exports = function (fileName, opts) {
  opts = options.normalize(opts)

  if (options.skipIt(fileName, opts)) return through()

  const chunks = []

  return through(
    function (chunk, enc, next) {
      chunks.push(chunk)
      next()
    },
    function (done) {
      const buffer = Buffer.concat(chunks)
      const source = buffer.toString('utf-8')

      processCss(fileName, source, opts).then(moduleSource => {
        this.push(moduleSource)
        done()
      })
      .catch(done)
    }
  )
}
