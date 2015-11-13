'use strict'

const test = require('tape-catch')
const processCss = require('../../lib/process-css')

const defaultOptions = { _flags: {} }

const fileName = 'test.css'
const hashedFilename = '_nu4uke'

const css = '.test-class { font-family: "Times New Roman", sans-serif; }'
const escapedCss = '.test-class { font-family: \\"Times New Roman\\", sans-serif; }'

const devMap = '{\n\t\'test-class\': \'_test___test-class\'\n}'
const devCss = '._test___test-class { font-family: \\"Times New Roman\\", sans-serif; }'

const prodMap = '{\n\t\'test-class\': \'_1j9q0wu\'\n}'
const prodCss = '._1j9q0wu { font-family: \\"Times New Roman\\", sans-serif; }'

test('processCss', t => {
  processCss(fileName, css, Object.assign({}, defaultOptions))
    .then(moduleSource => {
      t.equal(
        moduleSource,
        `\
module.exports = "${escapedCss}";
`,
        'without injection'
      )

      return processCss(fileName, css, Object.assign({}, defaultOptions, {
        'auto-inject': true
      }))
    })
    .then(moduleSource => {
      t.equal(
        moduleSource, `\
var inject = require('.');
var css = "${escapedCss}";
inject(css, undefined, '${hashedFilename}');
module.exports = css;
`,
        'with injection'
      )

      return processCss(fileName, css, Object.assign({}, defaultOptions, {
        modules: true
      }))
    })
    .then(moduleSource => {
      t.equal(
        moduleSource,
        `\
module.exports = { css: "${prodCss}", map: ${prodMap} };
`,
        'with modules'
      )

      return processCss(fileName, css, Object.assign({}, defaultOptions, {
        'auto-inject': true,
        modules: true
      }))
    })
    .then(moduleSource => {
      t.equal(
        moduleSource,
        `\
var inject = require('.');
var css = "${prodCss}";
inject(css, undefined, '${hashedFilename}');
module.exports = ${prodMap};
`,
        'with modules and injection'
      )

      return processCss(fileName, css, Object.assign({}, defaultOptions, {
        modules: true,
        _flags: Object.assign({}, defaultOptions._flags, { debug: true })
      }))
    })
    .then(moduleSource => {
      t.equal(
        moduleSource,
        `\
module.exports = { css: "${devCss}", map: ${devMap} };
`,
        'with debug'
      )
    })
    .then(t.end)
    .catch(t.fail)
})
