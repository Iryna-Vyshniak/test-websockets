const db = require('../db');

const getInfoById = id => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM info WHERE id = ?;';
    const params = [id];

    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = getInfoById;
