'use strict';

const DBModel = require('./dbmodel');

class Plays extends DBModel {

    constructor() {
        super();
        this.table = 'plays';
    }
}

module.exports = new Plays();