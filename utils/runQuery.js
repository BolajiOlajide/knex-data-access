const knexInstance = require('../app');
const { writeToConsole } = require('./screen');

module.exports = (query, mode) => query
  .then(rows => writeToConsole(rows, mode))
  .catch((err) => console.log(err))
  .finally(() => knexInstance.destroy());
