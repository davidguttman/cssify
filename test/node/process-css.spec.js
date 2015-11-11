'use strict'

const test = require('tape-catch')
const processCss = require('../../lib/process-css')

test('processCss', t => {
  const fileName = 'test.css'
  const css = 'body { font-size: 10px; }'

  t.equal(
    processCss(fileName, css, {}),
    'module.exports = "' + css + '"',
    'without injection'
  )

  t.equal(
    processCss(fileName, css, { 'auto-inject': true }),
    'var css = "' + css + '"; ' +
    '(require("./lib"))' +
    '(css, undefined, \'' + fileName + '\'); ' +
    'module.exports = css;',
    'with injection'
  )

  t.end()
})
