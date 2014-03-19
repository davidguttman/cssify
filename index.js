"use strict";

var through = require("through");

module.exports = function (fileName) {
    if (!/\.css$/i.test(fileName)) {
        return through();
    }

    var inputString = "";

    return through(
        function (chunk) {
            inputString += chunk;
        },
        function () {
            var stringifiedCss = JSON.stringify(inputString);

            var moduleBody = "var css = " + stringifiedCss + "; (require("+JSON.stringify(__dirname)+"))(css); module.exports = css;";

            this.queue(moduleBody);
            this.queue(null);
        }
    );
};
