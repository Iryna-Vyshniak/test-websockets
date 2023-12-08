/* eslint-disable no-unused-expressions */
const db = require('../db');

const getAllInfo = () => {
  const sql = 'SELECT id, name, orgname, datecreate FROM info ORDER BY id DESC';
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err.message);
        reject(err);
      } else {
        console.log('Get all rows');
        resolve({
          message: 'success',
          data: rows
        });
      }
    });
  });
};

module.exports = getAllInfo;
