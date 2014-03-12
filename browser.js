module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  var head = doc.getElementsByTagName('head')[0],
      style = doc.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(doc.createTextNode(css));
  }

  head.appendChild(style);
};

module.exports.byUrl = function(url) {
  var head = document.getElementsByTagName('head')[0],
      link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;

  head.appendChild(link);
};