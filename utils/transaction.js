const R = rwquire('ramda');
const knexInstance = require('../app');
const { writeToConsole } = require('./screen');


const will = { firstname: 'Williams', lastname: 'Shakespare' };
const books = [
  { title: 'The cat in the hat', rating: 9 },
  { title: 'Green eggs and Ham', rating: 10 }
];
// transaction - it must always return a promise
knexInstance.transaction(trx => {
  return trx
    .insert(will, 'id').into('author')
    .then(idArr => {
      const author_id = idArr[0]; // we are certain only one ID will be returned
      const formattedBooks = R.map(
        R.assoc('author_id', author_id),
        books
      );
      return trx.insert(formattedBooks).into('book');
    });
})
  .then(() => {
    writeToConsole(`${books.length} books inserted`, 'pretty');
  })
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());


// am alternate way to do transactions
// transaction - it must always return a promise
knexInstance.transaction(trx => {
  trx
    .insert(will, 'id').into('author')
    .then(idArr => {
      const author_id = idArr[0]; // we are certain only one ID will be returned
      const formattedBooks = R.map(
        R.assoc('author_id', author_id),
        books
      );
      return trx.insert(formattedBooks).into('book');
    })
    .then(trx.commit)
    .catch(trx.rollback);
})
  .then(() => {
    writeToConsole(`${books.length} books inserted`, 'pretty');
  })
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());