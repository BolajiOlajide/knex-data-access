const knexInstance = require('../app');
const { writeToConsole } = require('./screen');


knexInstance('book')
  .join('author', 'author.id', '=', 'book.author_id')
  .select('author.firstname', 'author.lastname', 'book.title as bookTitle')
  .then(rows => writeToConsole(rows, 'pretty'))
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());

const alternateJoinQuery = knexInstance('book')
  .join('author', function() {
    this.on('author.id', '=', 'book.author_id')
      // .orOn('..') -- for multiple conditions
  })
  .where('author.firstname', '<>', 'George')
  .select('author.firstname', 'author.lastname', 'book.title as bookTitle');