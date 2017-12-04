var express = require('express')
var jsonF = require('./books');
var func = require('./utils/async.js').func;
var app = express()

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

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

app.get('/metrics', function (req, res) {
    var data = require('./utils/metrics.js').metrics;
    var data = {
        ["metrics"]: data
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/metrics', function (req, res) {
    var data = req.body.metrics;
    var expression = req.body.expression;

    var metrics = require('./utils/metrics.js').metrics;
    var invalid_datas = data.filter((x) => !metrics.includes(x));
    if (invalid_datas.length > 0 || data.length <= 0 || expression == '') {
        res.status(400);
        console.log("Bad request 400 : Invalid data");
    }
    else {
        res.status(200);
        console.log(expression);
    }
    res.end();
});

app.listen(3000);

module.exports = app;

