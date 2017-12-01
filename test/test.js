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