const db = require('../db');

const editNameCard = data => {
  // console.log('data EDIT: ', data);
  return new Promise((resolve, reject) => {
    const id = data[0].id;
    const sql = `UPDATE info SET name = COALESCE(?, name) WHERE id = ?;`;
    const params = [data[0].name, id];

    db.run(sql, params, function (err) {
      if (err) {
        reject('Server error');
      }

      resolve({
        message: 'success',
        data,
        changes: this.changes
      });
    });
  });
};

module.exports = editNameCard;
