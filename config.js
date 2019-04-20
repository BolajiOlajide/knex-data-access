const sqliteCfg = {
  client: 'sqlite3',
  connection: {
    filename: 'book.sqlite'
  },
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  }
};

const pgCfg = {
  client: 'pg',
  connection: 'postgres://bolaji:andela@localhost/knex-pg-books',
  pool: {
    min: 1,
    max: 1
  }
}

module.exports = pgCfg;
