const knexInstance = require('../app');

const { writeToConsole } = require('./screen');


const charles = { firstname: 'Charles', lastname: 'Odili' };
const will = { firstname: 'Williams', lastname: 'Shakespare' };
const ed = { firstname: 'Edgar', lastname: 'Poe' };
const doc = { firstname: 'Dr.', lastname: 'Seuss' };

// insert into the DB
// knexInstance.insert(will).into('author') // can be rewritten as knexInstance('author').insert(charles)
knexInstance.insert([ed, doc]).returning('id').into('author') // postgres thing to return the ID when promise resolves
// equivalent to  knexInstance.insert([ed, doc]).into('author', 'id')
  .debug(false)
  .then(id => {
    console.log('ID====>>>>>', id);
    return knexInstance('author'); // another way of saying knexInstance.select('*').from('author')
  })
  .then(rows => writeToConsole(rows, 'pretty'))
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());
