// This node project works with an express framework. 
// Additionally, I use dotenv and cors modules to manage environnement variables
// and cross-origin ressource sharing, respectively.
// Ejs is used as html templating engine and pg helps interfacing with the PostgreSQL database.

// to import and execute dotenv package:
require('dotenv').config();
// to import and execute express:
const express = require('express');
const router = require('./app/router');
// ...to store the app:
const app = express();
// to set the environnement variable concerning port the server "should watch out for"/ listen to:
const PORT = process.env.PORT || 8020;
// to import and execute cors package:
const cors = require('cors');
// to set the templating engine we're using for app (require not necessary here,
// express handles by itself):
app.set('view engine', 'ejs');
// to locate views (_dirname allows to recuperate the path of current file):
app.set('views', __dirname + '/app/views');
// to tell express the path to static files:
app.use(express.static('public'));
app.use(cors());
// data is sent in json format (POST routes)
app.use(express.json());
/* // alternatively :
app.use(express.urlencoded({ extended: true })) */
// to use router.js:
app.use(router);
// if no route in the router responds to the request, middleware to manage 
// the case: 404
app.use((request, response) => {
  response.status(404).render('404');
});
// middleware to show the error:
app.use((error, request, response, next) => {
  console.error(error);
  next(error);
});
// to manage errors in the application, going through 
// a middleware with 4 parameter signature (the 4th is the error to manage)
app.use((error, request, response, next) => {
  response.status(500).render('error');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});