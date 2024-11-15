const db = require('../db');

class Application {
  
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS applications (
        jobId INTEGER,
        userId INTEGER,
        description TEXT,
        salary REAL,
        FOREIGN KEY (jobId) REFERENCES jobs(id),
        FOREIGN KEY (userId) REFERENCES users(id)
      );
      CREATE INDEX idx_userId ON applications (userId);
      CREATE INDEX idx_jobId ON applications (jobId);
    `;

    return new Promise((resolve, reject) => {
      db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async insertApplication(jobId, userId, description, salary) {
    const sql = `
      INSERT INTO applications (jobId, userId, description, salary) VALUES (?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      db.run(sql, [jobId, userId, description, salary], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async getApplications(jobId) {
    const sql = `
      SELECT * FROM applications WHERE jobId = ?;
    `

    return new Promise((resolve, reject) => {
      db.all(sql, [jobId], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
  }
}

module.exports = Application