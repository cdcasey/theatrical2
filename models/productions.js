'use strict';

const knex = require('../db/knex');
const DBModel = require('./dbmodel');

class Productions extends DBModel {

    constructor() {
        super();
        this.table = 'productions';
    }

    byUser(userId) {
        return knex(this.table)
            .select('productions.id as id', 'productions.name')
            .join('users_productions', 'productions.id', 'users_productions.production_id')
            .where('users_productions.user_id', userId);
    };

}

module.exports = new Productions();