const chai = require('chai')
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js');

describe('The normal endpoints', function () {

    it('Get the users', function () {
        return chai.request(app)
            .get('/users')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.string;
            });
    });

    it('should return Not Found', function () {
        return chai.request(app)
            .get('/INVALID_PATH')
            .then(function (res) {
                throw new Error('Path exists!');
            })
            .catch(function (err) {
                expect(err).to.have.status(404);
            });
    });
});

describe('The /add endpoint', function () {

    it('Add two numbers correctly', function () {
        return chai.request(app)
            .get('/add')
            .query({ num1: 1, num2: 3 })
            .then(function (res) {
                expect(4);
                expect(res).to.be.string;
            });
    });

    it('Add one number and some string', function () {
        return chai.request(app)
            .get('/add')
            .query({ num1: 1, num2: "the" })
            .then(function (res) {
                expect("Failed");
                expect(res).to.be.string;
            });
    });

});


describe('The /metrics endpoint', function () {

    it('GET the correct metrics', function () {
        return chai.request(app)
            .get('/metrics')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.metrics).to.deep.equal(require('../utils/metrics.js').metrics);
            });
    });

    it('POST and validate the correct metrics', function () {
        return chai.request(app)
            .post('/metrics')
            .send({ "metrics": require("../utils/metrics.js").metrics.slice(0, 1) ,
                "expression":"X+5=4"})
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it('POST and validate the incorrect metrics', function () {
        return chai.request(app)
            .post('/metrics')
            .send({ "metrics": ["fdgf", "afsfdss"]
                ,"expression":"X+5=4" })
            .then(function (res) {
                throw new Error("The invalid metrics are correct");
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
            });
    });

    it('POST and validate empty metrics', function () {
        return chai.request(app)
            .post('/metrics')
            .send({ "metrics": [] , "expression": "x+5=2" })
            .then(function (res) {
                throw new Error("The invalid metrics are correct");
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
            });
    });

    it('POST and validate empty expression', function () {
        return chai.request(app)
            .post('/metrics')
            .send({ "metrics": ["CPU"] , "expression": "" })
            .then(function (res) {
                throw new Error("The invalid metrics are correct");
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
            });
    });

});
