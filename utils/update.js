const knexInstance = require('../app');

const { writeToConsole } = require('./screen');


knexInstance('book').where('author_id', 1)
  .update({ rating: 0 }) // if you don't specify returning, what you get is the count of items deleted
  .debug(false)
  .then(count => {
    console.log('ID====>>>>>', count);
    return knexInstance('book').where('author_id', 1).debug(false); // another way of saying knexInstance.select('*').from('author')
  })
  .then(rows => writeToConsole(rows, 'pretty'))
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());
