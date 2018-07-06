'use strict';

process.env.PORT = 8888;
const server = require('../server');
const request = require('supertest')(server);
const expect = require('chai').expect;

const knex = require('../db/knex');

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


describe('GET /plays', () => {
    it('should return a full list of plays', (done) => {
        request.get('/plays')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('Romeo');
                done(err);
            });
    });

    it('should return a 404 if the URL is spelled wrong', (done) => {
        request.get('/play')
            .expect(404)
            .end(done);
    });
});

describe('GET /plays/:id', () => {
    it('should return a plays record from the given ID', (done) => {
        request.get('/plays/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.plays.name).to.equal('Romeo and Juliet');
                done(err);
            });
    });

    it('should return undefined for an unknown play', (done, id) => checkPlayDoesNotExist(done, 9999));
});

describe('POST /plays', () => {
    it('should create a new play in the database', (done) => {
        request.post('/plays')
            .send({ author_first_name: 'Samuel', author_last_name: 'Beckett', name: 'Waiting for Godot' })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.play[0].name).to.equal('Waiting for Godot');
                knex('plays')
                    .where('id', res.body.play[0].id)
                    .first()
                    .then((play) => {
                        expect(play.name).to.equal('Waiting for Godot');
                        done(err);
                    });
            });

    });
});

describe('PATCH /plays/:id', () => {
    it('should update info about a play', (done) => {
        request.patch('/plays/3')
            .send({ author_first_name: 'Daniel' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                knex('plays')
                    .where({
                        id: '3'
                    })
                    .first()
                    .then((play) => {
                        expect(play.author_first_name).to.equal('Daniel');
                        expect(play.name).to.equal('Waiting for Godot');
                        done(err);
                    });
            });
    });

    it('should return undefined for an unknown play', (done, id) => checkPlayDoesNotExist(done, 9999));
});

describe('DELETE /plays/:id', () => {
    it('should delete a play by id', (done) => {
        request.delete('/plays/3')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => checkPlayDoesNotExist(done, 3));
    });

    it('should return undefined for an unknown play', (done, id) => checkPlayDoesNotExist(done, 9999));
});

function checkPlayDoesNotExist(done, id) {
    request.get('/plays/' + id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            expect(JSON.parse(res.text)).to.deep.equal({});
            done(err);
        });
}