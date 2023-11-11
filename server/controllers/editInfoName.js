const db = require('../db');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const editInfoName = (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name
  };

  const query = `UPDATE info SET
    name = COALESCE(?, name)
    WHERE id = ?;`;

  const params = [data.name, id];

  return db.run(query, params, function (err, result) {
    if (err) {
      throw HttpError(500, 'Server error');
    }
    res.status(200);
    res.json({
      message: 'success',
      data,
      changes: this.changes
    });
  });
};

module.exports = ctrlWrapper(editInfoName);
