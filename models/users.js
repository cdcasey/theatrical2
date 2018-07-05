'use strict';

const DBModel = require('./dbmodel');

class Users extends DBModel {

    constructor() {
        super();
        this.table = 'users';
    }
}

module.exports = new Users();