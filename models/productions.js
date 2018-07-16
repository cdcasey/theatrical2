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

    castList(id) {
        return knex('users')
            .orderBy('users.id')
            .select('users.first_name', 'users.last_name', 'characters.name as character')
            .join('users_characters', 'users.id', 'users_characters.user_id')
            .join('characters', 'users_characters.character_id', 'characters.id')
            .join('users_productions', 'users_productions.user_id', 'users.id')
            .where('users_productions.production_id', id);
    }

    productionDates(id) {
        return knex('production_dates')
            .orderBy('id')
            .where('production_id', id)
    }
}

module.exports = new Productions();