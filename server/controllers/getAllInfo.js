const db = require('../db');

const getAllInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, name, orgname, datecreate FROM info ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = getAllInfo;
