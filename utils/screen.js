const prettyjson = require('prettyjson');


function clearConsole() {
  // clear the screen
  process.stdout.write('\033c');
}

function writeToConsole(data, mode = null) {
  const ops = {
    stringColor: 'white',
    keysColor: 'cyan',
    dashColor: 'magenta',
    numberColor: 'yellow'
  };
  let output = data;


  if (mode === 'json') {
    output = JSON.stringify(data, null, 4);
  } else if (mode === 'pretty') {
    output = prettyjson.render(data, ops);
  }

  console.log(output);
}

module.exports = { clearConsole, writeToConsole };
