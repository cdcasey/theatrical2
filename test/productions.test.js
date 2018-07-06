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


describe('GET /productions', () => {
    it('should return a full list of productions', (done) => {
        request.get('/productions')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.include('Romeo');
                done(err);
            });
    });

    it('should return a 404 if the URL is spelled wrong', (done) => {
        request.get('/production')
            .expect(404)
            .end(done);
    });
});

describe('GET /productions/:id', () => {
    it('should return a production record from the given ID', (done) => {
        request.get('/productions/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.productions.name).to.equal('The Baron\'s Men present Romeo and Juliet');
                done(err);
            });
    });

    it('should return undefined for an unknown production', (done, id) => checkproductionDoesNotExist(done, 9999));
});

describe('POST /productions', () => {
    it('should create a new production in the database', (done) => {
        request.post('/productions')
            .send({ name: 'The Baron\'s Men Present Much Ado About Nothing', play_id: '2' })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.production[0].name).to.equal('The Baron\'s Men Present Much Ado About Nothing');
                knex('productions')
                    .where('id', res.body.production[0].id)
                    .first()
                    .then((production) => {
                        expect(production.name).to.equal('The Baron\'s Men Present Much Ado About Nothing');
                        done(err);
                    });
            });

    });
});

describe('PATCH /productions/:id', () => {
    it('should update info about a production', (done) => {
        request.patch('/productions/2')
            .send({ name: 'Just Much Ado' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                knex('productions')
                    .where({
                        id: '2'
                    })
                    .first()
                    .then((production) => {
                        expect(production.play_id).to.equal(2);
                        expect(production.name).to.equal('Just Much Ado');
                        done(err);
                    });
            });
    });

    it('should return undefined for an unknown production', (done, id) => checkproductionDoesNotExist(done, 9999));
});

describe('DELETE /productions/:id', () => {
    it('should delete a production by id', (done) => {
        request.delete('/productions/2')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => checkproductionDoesNotExist(done, 2));
    });

    it('should return undefined for an unknown production', (done, id) => checkproductionDoesNotExist(done, 9999));
});

function checkproductionDoesNotExist(done, id) {
    request.get('/productions/' + id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            expect(JSON.parse(res.text)).to.deep.equal({});
            done(err);
        });
}