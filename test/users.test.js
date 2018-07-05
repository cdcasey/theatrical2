'use strict';

process.env.PORT = 8888;
process.env.NODE_ENV = 'test';
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

// const knexConfig = require('../knexfile')['test'];
// const knex = require('knex')(knexConfig);
const knex = require('../db/knex');
const bcryptSync = require('bcrypt');

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

describe('POST /users', () => {
    it('should create a new user in the database', (done) => {
        request.post('/users')
            .send({ first_name: 'Charlie', last_name: 'Stites', phone: '555-555-555', email: 'charlie@someemail.nope', password: 'charlie', role_id: 2 })
            .expect(200)
            .end(function (err, res) {
                console.log(knex.client.database());
                if (err) throw err;
                knex('users')
                    .where({
                        email: 'charlie@someemail.nope'
                    })
                    .first()
                    .then((user) => {
                        expect(user.last_name).to.equal('Stites');
                        expect(bcryptSync.compareSync('charlie', user.password)).to.equal(true);
                        knex('users')
                            .where('id', user.id)
                            .first()
                            .del()
                            .then(() => {
                                done(err)
                            }
                            );
                    });
            });

    });
});