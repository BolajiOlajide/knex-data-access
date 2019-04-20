const cfg = {
    client: 'sqlite3',
    connection: {
        filename: 'book.sqlite'
    },
    useNullAsDefault: true,
    pool: {
        min: 1,
        max: 1
    }
}

module.exports = cfg;
