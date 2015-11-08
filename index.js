/* eslint-env node */
'use strict';

var path = require('path');
var through = require('through');

var RegExpRE = /^\/(.*)\/(.*)$/;
var cssRE = /\.css$/i;

function stringToRegExp(str) {
  var match = RegExpRE.exec(str);
  if (!match) return;

  var re = match[1];
  var flags = match[2];
  return new RegExp(re, flags);
}

module.exports = function (fileName, options) {
  options = options || {};
  if (typeof(options['auto-inject']) == 'undefined') {
    options['auto-inject'] = true;
  }

  if (options.test) {
    if (typeof(options.test) === 'string') {
      options.test = stringToRegExp(options.test);
    }
  } else {
    options.test = cssRE;
  }

  if (typeof options.test === 'function') {
    if (!options.test(fileName)) {
      return through();
    }
  } else if (options.test instanceof RegExp) {
    if (!options.test.test(fileName)) {
      return through();
    }
  }

  var inputString = '';

  return through(
    function (chunk) {
      inputString += chunk;
    },
    function () {
      var stringifiedCss = JSON.stringify(inputString);
      var requirePath = path.relative(path.dirname(fileName), __dirname);
      var moduleBody = options['auto-inject']
        ? 'var css = ' + stringifiedCss + '; (require(' + JSON.stringify(requirePath) + "))(css, undefined, '" + fileName + "'); module.exports = css;"
        : 'module.exports = ' + stringifiedCss;

      this.queue(moduleBody);
      this.queue(null);
    }
  );
};
