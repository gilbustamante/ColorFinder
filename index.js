if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// TODO: file upload validation

const express = require('express');
const fileUpload = require('express-fileupload');
const ejsMate = require('ejs-mate');
const path    = require('path');
const app     = express();

// App setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.listen(3000, () => {
  console.log('Server listening...')
});