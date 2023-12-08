const db = require('../db');

const getInfoById = id => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM info WHERE id = ?;';
    const params = [id];

    db.all(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          // If row is not null or undefined, return the data
          resolve({
            message: 'Success',
            data: row
          });
        } else {
          // If row is null or undefined, handle the case (e.g., return an error message)
          reject('Data not found');
        }
      }
    });
  });
};

module.exports = getInfoById;
