const knexInstance = require('./app');


// selecting using a callback
knexInstance.select('title', 'rating').from('book')
  .asCallback((err, rows) => {
    if (err) console.log(err);
    else {
      console.log(rows)
    }
    knexInstance.destroy();
  });
