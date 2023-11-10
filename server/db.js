const sqlite3 = require('sqlite3');

//Create a connection to the info.db database if it is created, if not, this code will create a db with that name.
const db = new sqlite3.Database('server/cards.db', err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connection established successfully');
  }
});

// Creates a table if it does not exist in the cards.db database
const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='info';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS info(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(255) NOT NULL, 
  orgname VARCHAR(255) NULL, 
  datecreate VARCHAR(255) NOT NULL);`;

// Check if the 'info' table exists
db.all(tableCheckQuery, (err, rows) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Length of rows is: ', rows.length);
  if (!rows.length) {
    db.run(createTableQuery);
    console.log('Info table is successfully created.');
  } else {
  }
});

module.exports = db;
