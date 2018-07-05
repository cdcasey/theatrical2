'use strict';

const knex = require('../db/knex');
const bcryptSync = require('bcrypt');

class Users {

    constructor() {
        this.table = 'users';
    }

    all() {
        return knex(this.table).orderBy('id');
    }

    getById(id) {
        return knex(this.table).where('id', id).first();
    }

    create(data) {
        data = this.validateData(data);
        return knex(this.table).insert(data).returning('*');
    }

    validateData(data) {
        const validData = {};
        for (const key in data) {
            if (data[key]) {
                validData[key] = data[key];
            }
            if (key === 'password') {
                validData[key] = bcryptSync.hashSync(validData[key], 10);
            }
        }
        return validData;
    }
}

// Users.table = 'users';
module.exports = new Users();