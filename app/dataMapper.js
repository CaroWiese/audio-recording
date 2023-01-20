// databse connector
const database = require('./database');

const dataMapper = {
    getAllAudios: (callback) => {
        const query = {
            text: `SELECT * FROM audio;`
    }
    // database query
    database.query(query, (err, result) => {
      // if error
      if (err) {
        // transmission without result
        callback(err, null);
      }
      // if success
      else {
        // follow-up without error
        callback(null, result?.rows)
      }
    });
  }
}

module.exports = dataMapper;