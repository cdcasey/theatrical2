process.env.PORT = 8888;
const expect = require('chai').expect;
const server = require('../server');
const request = require('supertest')(server);

describe('Existence of the server', () => {
    it('should say hello', (done) => {
        request.get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('hello')
                done(err);
            });
    });
});
