const db = require('../db');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const getAllInfo = (req, res, next) => {
  db.all('SELECT id, name, orgname, datecreate FROM info ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      throw HttpError(500, 'Server error');
    } else {
      console.log('Data retrieved successfully');
      res.status(200).json(rows);
    }
  });
};

module.exports = ctrlWrapper(getAllInfo);
