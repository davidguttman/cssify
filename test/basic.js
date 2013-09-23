"use strict";

var fs = require("fs");
var path = require("path")
var assert = require("assert");
var concatStream = require("concat-stream");
var browserify = require("browserify");
var jsdom = require("jsdom").jsdom;
var cssify = require("..");

var pageHtml = fs.readFileSync(fixturePath("index.html"), "utf8");
var bundleStream = browserify()
  .transform(cssify)
  .add(fixturePath("entry.js"))
  .require('..', {expose: 'cssify'})
  .bundle();

specify("It gives the desired output", function (done) {
  bundleStream.pipe(concatStream(function (bundleJs) {

    var window = jsdom(pageHtml).createWindow();

    var c1 = colors(window);
    assert.equal(c1.bg, '')
    assert.equal(c1.fg, '')

    var scriptEl = window.document.createElement("script");
    scriptEl.textContent = bundleJs;
    window.document.head.appendChild(scriptEl);

    var c2 = colors(window);
    assert.equal(c2.bg, 'purple')
    assert.equal(c2.fg, 'yellow')

    done();

  }));
});

function fixturePath(fileName) {
  return path.resolve(__dirname, "fixtures/basic", fileName);
}

function colors (win) {
  var style = win.getComputedStyle(win.document.body);
  return {
    bg: style.backgroundColor.replace(/\s+/g, ''),
    fg: style.color.replace(/\s+/g, '')
  };
}