process.env.PORT = 8888;
process.env.NODE_ENV = 'test';
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

describe('GET /users', () => {
    it('should return a full list of users', (done) => {
        request.get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('Hegedus');
                done(err);
            });
    });

    it('should return a 404 if the URL is spelled wrong', (done) => {
        request.get('/user')
            .expect(404)
            .end(done);
    });
});