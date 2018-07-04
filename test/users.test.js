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

describe('GET /users/:id', () => {
    it('should return a users record from the given ID', (done) => {
        request.get('/users/3')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('Chris');
                expect(res.body.user.phone).to.equal('512-850-6232');
                expect(res.body.user.email).to.equal('cdcasey@gmail.com');
                done(err);
            });
    });

    it('should return undefined for an unknown user', (done) => {
        request.get('/users/99999')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(JSON.parse(res.text)).to.deep.equal({});
                done(err);
            });
    });
});