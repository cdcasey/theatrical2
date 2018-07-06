'use strict';

const DBModel = require('./dbmodel');

class Productions extends DBModel {

    constructor() {
        super();
        this.table = 'productions';
    }
}

module.exports = new Productions();