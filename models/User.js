const db = require('../db');

class User {
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      )`;
    return new Promise((resolve, reject) => {
      db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  static async insertUser(username, email, password, role) {
    const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [username, email, password, role], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            username,
            email,
            role
          });
        }
      })
    })
  }

  static async getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?;`;

    return new Promise((resolve, reject) => {
      db.get(sql, [email], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }
}

module.exports = User