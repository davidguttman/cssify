module.exports = function(bundle) {
  bundle.register('.css', function(body, fn) {
    var css = body.replace(/\"/g, "\\\"").replace(/\n/g, "\\\n");
    return "var css = '" + css + "'; (require('cssify'))(css); module.exports = css;";
  });
};