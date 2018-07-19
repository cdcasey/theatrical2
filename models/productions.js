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
            .select('users.id as id', 'users.first_name', 'users.last_name', 'users.email', 'users.phone', 'characters.name as character', 'blackout_dates.start_time', 'blackout_dates.end_time')
            .join('users_characters', 'users.id', 'users_characters.user_id')
            .join('characters', 'users_characters.character_id', 'characters.id')
            .join('users_productions', 'users_productions.user_id', 'users.id')
            .fullOuterJoin('blackout_dates', 'users.id', 'blackout_dates.users_id')
            .where('users_productions.production_id', id);
    }

    productionDates(id) {
        return knex('production_dates')
            .orderBy('id')
            .where('production_id', id)
    }

    rehearsalDates(id) {
        return knex('rehearsal_dates')
            .orderBy('rehearsal_dates.id')
            .select('start_time', 'end_time', 'scenes.name')
            .join('scenes', 'rehearsal_dates.scene_id', 'scenes.id')
            .where('production_id', id)
    }

    blackoutDates(productionId) {
        return knex('blackout_dates')
            .orderBy('blackout_dates.id')
            .select('users.id as id', 'users.first_name', 'users.last_name', 'users.phone', 'users.email', 'start_time', 'end_time')
            .join('users', 'blackout_dates.users_id', 'users.id')
            .join('users_productions', 'users_productions.user_id', 'users.id')
            .where('users_productions.production_id', productionId)
    }
}

module.exports = new Productions();