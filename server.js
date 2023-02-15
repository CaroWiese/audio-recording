// This Node project uses an Express framework. 
// Additionally, I use dotenv and cors npm modules to manage environnement variables
// and cross-origin ressource sharing, respectively.
// Ejs is used as the html templating engine and pg to interface with a PostgreSQL database 
// I manage via Sqitch.

require('dotenv').config(); //import and execute  dotenv package
const express = require('express'); //import and execute Express
const router = require('./app/router'); //locate router
const app = express(); //...to store the app
const PORT = process.env.PORT || 8020; //set environnement variable of the port for which server should watch out for/listen to
const cors = require('cors'); //import and execute cors package
app.set('view engine', 'ejs'); //set templating engine to use for app (require not necessary, Express handles by itself)
app.set('views', __dirname + '/app/views'); //locate views (_dirname allows to recuperate the path of current file)
app.use(express.static('app')); //tell Express the path to static files
app.use(cors());
app.use(express.json()); //data sent in json format (POST routes)
//app.use(express.urlencoded({ extended: true })) //alternative format to send data through POST routes
app.use(router); //use router.js

// middlewares to manage if no route in the router responds to request:
app.use((request, response) => {
  response.status(404).render('404'); //case of 404 (not found)
});
app.use((error, request, response, next) => {
  console.error(error); //show error
  next(error);
});
app.use((error, request, response, next) => { //error management within application via 
  response.status(500).render('error'); //middleware with 4 parameter signature (4th is the error to manage)
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});