const knexInstance = require('../app');


const cols = ['title', 'rating'];

// get just the first row in a table
const firstRatingQuery = knexInstance('book').select('rating').first();

const specifyLimitQuery = knexInstance('book').select('rating').limit(3);

const distinctQuery = knexInstance('book').select('rating').distinct();

const rawSelectQuery = knexInstance('book').select(
  knexInstance.raw('COUNT(*) AS BookCount')
);

const rawSQLQUery = knexInstance.raw('SELECT * FROM book WHERE rating < 8');

const author_id = 1;
const rawSQLQUeryWithBind = knexInstance.raw(
  'SELECT * FROM book WHERE author_id = ?',
  [author_id]
);

const orderByQuery = knexInstance('book').column('title', 'rating')
  .orderBy('title', 'desc'); // default is 'asc' if nothing is specified

const orderByRawQuery = knexInstance('book').column('title', 'rating')
  .orderByRaw('title desc'); // this lets you enter the raw sort expression

const offsetQuery = knexInstance('book').column(cols).orderBy('title')
  .limit(2).offset(2);

const aliasSelectQuery = knexInstance('book')
  .column('title as bookTitle', 'rating as bookRating').first();

const selectMinQuery = knexInstance('book').min('rating as lowScore');

const groupByMinScore = knexInstance('book').min('rating as lowScore').groupBy('author_id');

const selectWithWhereCondition = knexInstance('author').where({ firstname: 'Mark', lastname: 'Twain'});

const selectWithEqualCondition = knexInstance('author').where('id', 1); // gives you the author with an id of 1
// alternative you can be explicit .where('id', '=', 1);

const selectWithInClause = knexInstance('author').where('id', 'in', [1,2,3]);

// you can also make use of subqueries
const subquery = knexInstance('author').select('id').where('id', '>', '2');
const selectWithSubquery = knexInstance('author').where('id', 'in', subquery);

const multipleWhereQuery = knexInstance('author').where(function() {
  this.where('id', 1).orWhere('id', '>', 3);
}).orWhere({ firstname: 'Mark' });

const whereExistsQuery = knexInstance('book').whereExists(function() {
  this.from('author').whereRaw('1=1') // this where clause will always evaluate to true
});

const joinQuery = knexInstance('book')
  .join('author', 'author.id', '=', 'book.author_id')
  .select('author.firstname', 'author.lastname', 'book.title');

const alternateJoinQuery = knexInstance('book')
  .join('author', function() {
    this.on('author.id', '=', 'book.author_id')
      // .orOn('..') -- for multiple conditions
    this.where('author.firstname', '<>', 'George')
  })
