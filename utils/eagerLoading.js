const Treeize = require('treeize');
const R = require('ramda');


// make use of treeize for eager loading
const eagerLoadQuery = knexInstance('book')
  .join('author', function() {
    this.on('author.id', '=', 'book.author_id')
  })
  .select(
    'author.firstname', 'book.title as books:title',
    'author.lastname', 'book.id as books:id',
    'book.rating as books:rating'
  )
  .where('author.id', 1)
  .debug(false)
  .then(rows => {
    const tree = new Treeize();
    tree.grow(rows);
    const authors = tree.getData();
    writeToConsole(authors, 'pretty')
  })
.catch((err) => console.log(err))
.finally(() => knexInstance.destroy());

// alternate implementation of eager loading w/o using a 3rd-party library
const authorRow = knexInstance('author').where('id', 1).debug(false).then();
const booksRow = knexInstance('book').where('author_id', 1).debug(false).then();
Promise.all([authorRow, booksRow])
  .then(results => {
    const author = R.pick(['firstname', 'lastname'], results[0][0]);
    author.books = results[1]
    console.log(author);
    knexInstance.destroy()
  })
  .catch(err => console.log(err));