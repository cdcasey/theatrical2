'use strict';

const DBModel = require('./dbmodel');

class Scenes extends DBModel {

    constructor() {
        super();
        this.table = 'scenes';
    }
}

module.exports = new Scenes();