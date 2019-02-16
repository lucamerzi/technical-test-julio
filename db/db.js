const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./db/us-census.db",
  sqlite3.OPEN_READWRITE,
  err => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the db.");
  }
);

/**
 * Runs sql query on db.
 *
 * @param {sql} The desired query to be run.
 */
const query = sql =>
  new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

module.exports = query;
