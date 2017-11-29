const chai=require('chai')
const expect=require('chai').expect;

chai.use(require('chai-http'));

const app=require('../index.js');

describe('The API endpoint /users',function(){
    it('Get the user',function(){
        return chai.request(app)
                .get('/users')
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.string;
                });
    });

    it('should return Not Found', function() {
        return chai.request(app)
          .get('/INVALID_PATH')
          .then(function(res) {
            throw new Error('Path exists!');
          })
          .catch(function(err) {
            expect(err).to.have.status(404);
          });
      });
});