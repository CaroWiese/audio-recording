const {Router} = require('express');
const audioController = require('./audioController');
/* const audioController = require('./audioController'); */

const router = Router();

//test route
router.get('/hey', (_, response) => response.json('Hey world !'));

router.get('/', audioController.demoPage);

/* router.get('/', audioController.homePage); */

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

module.exports = router;