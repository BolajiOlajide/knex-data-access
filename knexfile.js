require('dotenv').config();

const sqliteCfg = {
  client: 'sqlite3',
  connection: {
    filename: 'book.sqlite'
  },
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  },
  debug: true
};

const pgCfg = {
  client: 'pg',
  connection: process.env.DB_URL,
  pool: {
    min: 1,
    max: 1
  },
  debug: true
}

module.exports = { pgCfg, sqliteCfg };
