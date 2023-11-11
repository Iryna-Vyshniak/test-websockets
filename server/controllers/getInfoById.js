const db = require('../db');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const getInfoById = (req, res, next) => {
  const query = `SELECT * FROM info WHERE id = ?;`;
  const params = [req.params.id];
  return db.each(query, params, (err, row) => {
    if (err) {
      throw HttpError(500, 'Bad Request');
    }
    res.status(200);
    res.json({
      message: 'success',
      data: row
    });
  });
};

module.exports = ctrlWrapper(getInfoById);
