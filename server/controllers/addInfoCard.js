const db = require('../db');

const addInfoCard = data => {
  return new Promise((resolve, reject) => {
    const errors = [];

    if (!data.name || !data.orgname) {
      errors.push('No name or orgname specified');
      reject(errors.join(','));
    }

    const sql = 'INSERT INTO info (name, orgname, datecreate) VALUES (?, ?, CURRENT_DATE);';
    const params = [data.name, data.orgname];

    db.run(sql, params, function (err) {
      if (err) {
        reject('Error inserting data into the database');
      }

      resolve({
        message: 'success',
        data,
        id: this.lastID
      });
    });
  });
};

module.exports = addInfoCard;
