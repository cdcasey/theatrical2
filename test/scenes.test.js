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


describe('GET /scenes', () => {
    it('should return a full list of scenes', (done) => {
        request.get('/scenes')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('1.prologue');
                done(err);
            });
    });

    it('should return a 404 if the URL is spelled wrong', (done) => {
        request.get('/scene')
            .expect(404)
            .end(done);
    });
});

describe('GET /scenes/:id', () => {
    it('should return a scene record from the given ID', (done) => {
        request.get('/scenes/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.scenes.name).to.equal('1.prologue');
                done(err);
            });
    });

    it('should return undefined for an unknown scene', (done, id) => checksceneDoesNotExist(done, 9999));
});

describe('POST /scenes', () => {
    it('should create a new scene in the database', (done) => {
        request.post('/scenes')
            .send({ name: '2.5', play_id: '2' })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.scene[0].name).to.equal('2.5');
                knex('scenes')
                    .where('id', res.body.scene[0].id)
                    .first()
                    .then((scene) => {
                        expect(scene.name).to.equal('2.5');
                        done(err);
                    });
            });
    });
});

describe('PATCH /scenes/:id', () => {
    it('should update info about a scene', (done) => {
        request.patch('/scenes/2')
            .send({ name: '1.1-1' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                knex('scenes')
                    .where({
                        id: '2'
                    })
                    .first()
                    .then((scene) => {
                        expect(scene.play_id).to.equal(1);
                        expect(scene.name).to.equal('1.1-1');
                        done(err);
                    });
            });
    });

    it('should return undefined for an unknown scene', (done, id) => checksceneDoesNotExist(done, 9999));
});

describe('DELETE /scenes/:id', () => {
    it('should delete a scene by id', (done) => {
        request.delete('/scenes/2')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => checksceneDoesNotExist(done, 2));
    });

    it('should return undefined for an unknown scene', (done, id) => checksceneDoesNotExist(done, 9999));
});

function checksceneDoesNotExist(done, id) {
    request.get('/scenes/' + id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            expect(JSON.parse(res.text)).to.deep.equal({});
            done(err);
        });
}