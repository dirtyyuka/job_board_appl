const db = require('../db');

class Job {
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        jobPoster INTEGER,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        salary REAL NOT NULL,
        keywords TEXT,
        FOREIGN KEY (jobPoster) REFERENCES users(id)
      );`;
    
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

  static async insertJob(jobPoster, title, location, description, salary, keywords) {
    // keywords should be a comma-separated string
    const keywordsString = Array.isArray(keywords) ? keywords.join(',') : keywords

    const sql = `INSERT INTO jobs (jobPoster, title, location, description, salary, keywords) VALUES (?, ?, ?, ?, ?, ?);`;

    return new Promise((resolve, reject) => {
      db.run(sql, [jobPoster, title, location, description, salary, keywordsString], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async getJobs(id) {
    const sql = `
      SELECT * FROM jobs WHERE jobPoster = ?;`;
    
    return new Promise((resolve, reject) => {
      db.all(sql, [id], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async searchJobs(query) {
    const sql = `
      SELECT * FROM jobs WHERE title LIKE ? OR description LIKE ? OR location LIKE ? OR keywords LIKE ?;
    `;

    return new Promise((resolve, reject) => {
      db.all(sql, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
  }
}

module.exports = Job;