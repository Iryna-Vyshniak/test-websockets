const db = require('../db');

const editInfoCard = data => {
  return new Promise((resolve, reject) => {
    const id = data.id;
    const sql = `UPDATE info SET name = COALESCE(?, name), orgname = COALESCE(?, orgname) WHERE id = ?;`;
    const params = [data.name, data.orgname, id];

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

module.exports = editInfoCard;
