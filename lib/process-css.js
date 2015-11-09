'use strict'

var path = require('path')

function processCss (fileName, source, options) {
  var stringifiedCss = JSON.stringify(source)
  var requirePath = path.relative(path.dirname(fileName), __dirname)
  var moduleBody = options['auto-inject']
    ? 'var css = ' + stringifiedCss + '; (require(' + JSON.stringify('./' + requirePath) + '))(css, undefined, \'' + fileName + '\'); module.exports = css;'
    : 'module.exports = ' + stringifiedCss

  return moduleBody
}

module.exports = processCss
