const knex = require('knex');

const config = require('./config');

const knexInstance = knex(config);

module.exports = knexInstance;
