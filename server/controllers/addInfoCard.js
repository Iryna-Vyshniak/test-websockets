const db = require('../db');

const addInfoCard = async data => {
  try {
    // Validation
    if (!data.name || !data.orgname) {
      throw new Error('No name or orgname specified');
    }

    // SQL query and parameters
    const sql = 'INSERT INTO info (name, orgname, datecreate) VALUES (?, ?, CURRENT_DATE);';
    const params = [data.name, data.orgname];

    // Execute the query
    db.run(sql, params, function (err) {
      if (err) {
        new Error('Error inserting data into the database');
      }
      console.log(`A row has been inserted`);
    });

    // Return success message, data, and ID
    return {
      message: 'success',
      data,
      id: this.lastID
    };
  } catch (error) {
    throw error;
  }
};

module.exports = addInfoCard;
