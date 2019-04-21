const knexInstance = require('./app');

const { clearConsole, writeToConsole } = require('./utils/screen');
const runQuery = require('./utils/runQuery');


clearConsole();

// see the raw sql statememt
const query = knexInstance.select('title', 'rating').from('book');
const altQuery = knexInstance.table('book').column('title', 'rating');
const columnsArr = ['title', 'rating']
const altQuery2 = knexInstance.table('book').column(columnsArr);
const altQuery3 = knexInstance('book').select('title', 'rating');
// const rawSQL = query.toSQL(); // or use .toString()
// console.log(rawSQL);
const selectMinQuery = knexInstance('book').min('rating as lowScore');

// query the DB using a callback
// altQuery.asCallback((err, rows) => {
//   if (err) console.log(err);
//   else {
//     writeToConsole(rows, 'json')
//   }
//   knexInstance.destroy();
//   console.log('Done.')
// });

// query the DB using promises
// altQuery3.then(rows => {
//   writeToConsole(rows, 'json');
//   console.log('Done.')
// }).catch(error => console.log(error.message))
//   .finally(() => knexInstance.destroy());

// resolves the query and passess it to the method supplied
// selectMinQuery.debug(false).tap(writeToConsole).finally(() => knexInstance.destroy());

// knexInstance('book').select('author_id').min('rating as lowScore').groupBy('author_id')
//   .then(rows => writeToConsole(rows, 'pretty')).catch((err) => console.log(err)).finally(() => knexInstance.destroy());

// fetch
// knexInstance('author').where({ firstname: 'Mark', lastname: 'Twain'})
//   .then(rows => writeToConsole(rows, 'pretty')).catch((err) => console.log(err)).finally(() => knexInstance.destroy());

// knexInstance('author').where('id', 1)
//   .then(rows => writeToConsole(rows, 'pretty')).catch((err) => console.log(err)).finally(() => knexInstance.destroy());

// knexInstance('author').where(function() {
//   this.where('id', 1).orWhere('id', '>', 3);
// }).orWhere({ firstname: 'Mark' })
// .then(rows => writeToConsole(rows, 'pretty'))
// .catch((err) => console.log(err))
// .finally(() => knexInstance.destroy());

// runQuery(alternateJoinQuery, 'pretty');
