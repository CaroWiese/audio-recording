const dataMapper = require('./dataMapper');

const audioController = {

  demoPage:(_, response) => {
    response.render('Demo', {
        title: 'View engine Demo'
    })
}

  /* homePage: (req, res, next) => {
    // getting the list of all audios from db
    dataMapper.getAllAudios((err, audios) => {
      // if there's an error
      if (err) {
        // error management middleware will handle
        return next(err);
      }
      // if everything's alright, rendering the view of all audios
      res.render('index', {
        audios
      });
    });
  } */
}

module.exports = audioController;