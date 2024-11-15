const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
    db.run(`PRAGMA foreign_keys = ON;`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }
});

module.exports = db