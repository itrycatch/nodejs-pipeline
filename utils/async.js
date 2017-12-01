var sleep=require("./sleep.js").sleep;

var func = function (a, b) {
    return new Promise(function (resolve, reject) {
        sleep(1000);
        if (a + b == (a + b)) {
            resolve((a + b));
        } else {
            reject("Failed");
        }
    });
}

module.exports.func=func;