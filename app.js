const knex = require('knex');

const config = require('./config');

const knexInstance = knex(config);
knexInstance.destroy();

module.exports = knexInstance;
