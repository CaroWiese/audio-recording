// This node project is working with an express framework. 
// Additionally, I use dotenv to manage environnement variables,
// ejs for html templates and pg to interface with a PostgreSQL database.

require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 8020;
/* const router = require('./app/router'); */

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

/* app.use(router); */

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});