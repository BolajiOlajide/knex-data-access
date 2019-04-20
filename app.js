require('dotenv').config();
const knex = require('knex');

const cfg = require('./knexfile');


let config;
if (process.env.DB_CONN = 'PG') config = cfg.pgCfg
else config = cfg.sqliteCfg;

const knexInstance = knex(config);

module.exports = knexInstance;
