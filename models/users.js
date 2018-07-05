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

    update(id, data) {
        data = this.validateData(data);
        return this.getById(id).update(data);
    }

    delete(id) {
        return this.getById(id).delete();
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

module.exports = new Users();