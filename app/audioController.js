const dataMapper = require('./dataMapper');

const audioController = {
  home: (request, response, next) => {
    dataMapper.getAllAudios((error, result) => {
      if(error) {
        return next (error);
      }
      const audios = result.rows;

      response.render('Demo', {audios});
    });
  },
  // function allowing to interpret the submission of a new audio?:
  addAudio: (request, response) => {
    // getting data from the body of the request
    // corresponds to an object which is undefined until express' bodyParsing is used
    // when used request.body represents an object containing all parametres sent by form
    const audio = request.body;
    // ask datamapper to add audio to database 
    // and notify when done (in callback)
    dataMapper.addAudio(
      audio.url,
    // when done:
    (error, success) => {
    // if error, stop here and forward message to middleware to manage error:
      if (error) {
        return next(error);
      }
    // if no error from database, audio has been added,
    // send success message
      if (success) {
        response.status(200).send({message: 'Audio was added to the database successfully.'})
      }
    // in case any error occurs while adding an audio, other than with the database (meaning more
    // than one or none added), newly created error will be given to error middleware (instance of an error used to
    // keep same object structure for errors)
      else {
        return next(new Error(`An error occurred while adding an audio to the database. `));
      }
    })
  }
};

module.exports = audioController;