const db = require('./database.js');

export const getAllInfo = (req, res, next) => {
  const query = 'SELECT * FROM info;';
  const params = [];
  return db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: rows
    });
  });
};
