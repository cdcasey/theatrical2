'use strict';

const knex = require('../db/knex');
const DBModel = require('./dbmodel');

class Users extends DBModel {

    constructor() {
        super();
        this.table = 'users';
    }

    getByEmail(email) {
        return knex(this.table).where('email', email).first();
    }

}

module.exports = new Users();