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
            var css = inputString.replace(/\"/g, "\\\"").replace(/\n/g, "\\\n");

            var moduleBody = "var css = '" + css + "'; (require('cssify'))(css); module.exports = css;";

            this.queue(moduleBody);
            this.queue(null);
        }
    );
};