'use strict'

var cssRE = /\.css$/i
var RegExpRE = /^\/(.*)\/(.*)$/

function normalize (opts) {
  opts = Object.assign({}, opts)

  if (typeof opts['auto-inject'] === 'undefined') {
    opts['auto-inject'] = true
  }

  if (opts.test) {
    if (typeof opts.test === 'string') {
      opts.test = stringToRegExp(opts.test)
    }
  } else {
    opts.test = cssRE
  }

  return opts
}

function skipIt (fileName, opts) {
  if (typeof opts.test === 'function') {
    if (!opts.test(fileName)) {
      return true
    }
  } else if (opts.test instanceof RegExp) {
    if (!opts.test.test(fileName)) {
      return true
    }
  }

  return false
}

function stringToRegExp (str) {
  var match = RegExpRE.exec(str)
  if (!match) return

  var re = match[1]
  var flags = match[2]
  return new RegExp(re, flags)
}

exports.normalize = normalize
exports.skipIt = skipIt
exports.stringToRegExp = stringToRegExp
