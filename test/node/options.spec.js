'use strict'

const test = require('tape-catch')
const options = require('../../lib/options')
const normalize = options.normalize
const skipIt = options.skipIt
const stringToRegExp = options.stringToRegExp

test('options.normalize', t => {
  t.equal(
    JSON.stringify(normalize()),
    JSON.stringify({ 'auto-inject': true, test: /\.css$/i }),
    'falls back to defaults'
  )

  t.equal(
    normalize({ 'auto-inject': null })['auto-inject'],
    null,
    'falsy value for auto-inject is returned as is'
  )

  t.equal(
    normalize({ test: '/str/' }).test.toString(),
    '/str/',
    'regular expression string is parsed for test option'
  )

  const testObj = {}

  t.equal(
    normalize({ test: testObj }).test,
    testObj,
    'non-string value for test option is passed as is'
  )

  t.end()
})

test('options.skipIt', t => {
  t.equal(skipIt('', {}), false, 'nothing to match')

  t.equal(
    skipIt('./style\.css', { test: () => false }),
    true,
    'function returning false'
  )

  t.equal(
    skipIt('./style\.css', { test: () => true }),
    false,
    'function returning true'
  )

  t.equal(
    skipIt('./style\.styl', { test: /\.styl$/ }),
    false,
    'matching RegExp'
  )

  t.equal(
    skipIt('./style\.styl', { test: /\.css$/ }),
    true,
    'not-matching RegExp'
  )

  t.end()
})

test('options.stringToRegExp', t => {
  const reSource = '/str/'
  const re = stringToRegExp(reSource)

  t.equal(re instanceof RegExp, true, 'RegExp is instantiated')

  t.equal(
    re.toString(), reSource,
    'regular expression converted to string matches source'
  )

  t.equal(
    stringToRegExp(), undefined,
    'returns undefined if arg is falsy'
  )

  t.end()
})
