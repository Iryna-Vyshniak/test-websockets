const db = require('../db');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const addInfo = (req, res, next) => {
  const data = req.body.data;

  const errors = [];

  if (!data.name || !data.orgname || !data.datecreate) {
    errors.push('No name specified');
    throw HttpError(500, 'No name specified');
  }

  // Modify all the query
  // const query = `INSERT INTO info (name, orgname, datecreate) VALUES (?,?,?);`;
  // const params = [data.name, data.orgname, data.datecreate];

  // Modify the query to include the current date
  const query = `INSERT INTO info (name, orgname, datecreate) VALUES (?, ?, CURRENT_DATE);`;
  const params = [data.name, data.orgname];

  db.run(query, params, function (err) {
    if (err) {
      throw HttpError(500, 'Error inserting data into the database');
    }

    res.status(201).json({
      message: 'success',
      data,
      id: this.lastID
    });
  });
};

module.exports = ctrlWrapper(addInfo);
