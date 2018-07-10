'use strict';

process.env.PORT = 8888;
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

const knex = require('../db/knex');
const bcryptSync = require('bcrypt');

before((done) => {
    knex.migrate.rollback().then(() => {
        knex.migrate.latest().then(() => {
            return knex.seed.run()
                .then(() => done())
                .catch((err) => done(err));
        });
    });
});

after((done) => {
    knex.migrate.rollback()
        .then(() => done())
        .catch((err) => done(err));
});


describe('POST /auth', () => {
    it('should return 200 on successful login', (done) => {
        request.post('/auth')
            .send({ email: 'cdcasey@gmail.com', password: 'chris' })
            .expect(200)
            .end(done);
    });

    it('should return a 401 if given the wrong password', (done) => {
        request.post('/auth')
            .send({ email: 'cdcasey@gmail.com', password: 'chri' })
            .expect(401)
            .end(done);
    });

    it('should return a 400 if given a non-existent email address', (done) => {
        request.post('/auth')
            .send({ email: 'cdcase@gmail.com', password: 'chris' })
            .expect(400)
            .end(done);
    });
});
