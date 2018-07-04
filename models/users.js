'use strict';

const knex = require('../db/knex');

class Users {

    constructor(first_name, last_name, email, phone = null, password, role_id = 2) {
        // this.table = 'users';
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role_id = role_id;
    }

    static all() {
        return knex(this.table).orderBy('id');
    }

    static getById(id) {
        return knex(this.table).where('id', id).first();
    }
}

Users.table = 'users';
module.exports = Users;