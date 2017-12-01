var express = require('express')
var jsonF = require('./books');
var func = require('./utils/async.js').func;
var app = express()

app.get('/users', function (req, res) {
    res.write(jsonF.firstName)
    res.end()
});

app.get('/add', function (req, res) {
    var a = Number(req.query.num1);
    var b = Number(req.query.num2);
    func(a, b).then(function (result) {
        res.write(String(result));
        res.end();
    }).catch(function (err) {
        res.w
        res.write(String(err));
        res.end();
    });
});

app.listen(3000);

module.exports = app;

