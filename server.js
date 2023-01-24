// This node project is working with an express framework. 
// Additionally, I use dotenv to manage environnement variables,
// ejs as html templating engine and pg to interface with a PostgreSQL database.

require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 8020;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

/* // Static route:
app.use(express.static('public')); */

// Data is sent in json format.
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});