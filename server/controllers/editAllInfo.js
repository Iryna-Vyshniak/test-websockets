const db = require('../db');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const editAllInfo = (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    orgname: req.body.orgname,
    datecreate: req.body.datecreate
  };

  const query = `UPDATE info SET
    name = COALESCE(?, name),
    orgname = COALESCE(?, orgname),
    datecreate = COALESCE(?, datecreate)
    WHERE id = ?;`;

  const params = [data.name, data.orgname, data.datecreate, id];

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

module.exports = ctrlWrapper(editAllInfo);
