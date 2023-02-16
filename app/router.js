const {Router} = require('express');
const audioController = require('./audioController'); //requests are being treated in controllers

const router = Router();

//test route
router.get('/hey', (request, response) => response.json('Hey world !'));
//route to page showing audio recorder and audios as well as adding audios
router.route('/')
        .get(audioController.home)
        .post(audioController.addAudio);

/* // These would be routes for an API Rest:
//retrieve all audio files
router.get('/audios', audioController.findAll);
//retrieve one audio file
router.get('/audios/:id(\\d+)', audioController.findOne);
//add a new audio file
router.post('/audios/save', audioController.save);
//update an audio file
router.patch('/audios/update', audioController.save);
//delete an audio file
router.delete('/audios/delete/:id(\\d+)', audioController.delete);

router.use((request, response) => response.status(404).json(`Endpoint ${request.url} not found`)); */

module.exports = router; //to expose the module