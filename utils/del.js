const knexInstance = require('../app');

const { writeToConsole } = require('./screen');


knexInstance('author').where('id', '>', '4').del().returning('id') // if you don't specify returning, what you get is the count of items deleted
  .debug(false)
  .then(id => {
    console.log('ID====>>>>>', id);
    return knexInstance('author').debug(false); // another way of saying knexInstance.select('*').from('author')
  })
  .then(rows => writeToConsole(rows, 'pretty'))
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());