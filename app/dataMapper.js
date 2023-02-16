// dataMapper is in charge of database requests

const database = require('./database'); // database connector

const dataMapper = {
  // thanks to the dataMapper, database requests are made via
  // dedicated methods, explicit names to retrieve data, but the
  // responsability of the dataMapper ends there: 
  // it's the controller which manages data treatment
  // which will be done with help of the callback

  // function to retrieve all audios
    getAllAudios: (callback) => {
  // https://node-postgres.com/features/queries#parameterized-query
        const query = {
          text: 'SELECT * FROM "audio" ORDER BY "id"'
    };
    database.query(query, callback);
  },
  // function to add an audio:
    addAudio: (url, callback) => {
      const query = `INSERT INTO "audio" (
        "url"
      ) VALUES (
        '${url}'
      );`;
    database.query(query, (error, result) => {
  // if there's a database error, callback transmitting the erorr is triggered
  // and success is put to "false" (since error = !success)
      if (error) {
        return callback(error, false);
    } 
  // if no database error (especially with syntax),
  // notification that no error in request and check that exactly one save occurred 
  // through the database insertion 
  // if yes, the value of success is true, elsewise it's false
    else {
        const success = (result.rowCount === 1);
  // finally, middleware is triggered
        return callback(null, success)
      }
    });
    }
};

module.exports = dataMapper;