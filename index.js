if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// TODO: file upload validation

const express = require('express');
const session = require('express-session');
const flash   = require('connect-flash');
const getColors = require('get-image-colors');
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

// Session setup
const sessionConfig = {
  name: 'GDCFSession',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}
app.use(session(sessionConfig));
app.use(flash());

// Flash
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');
  next();
});

// Temporary routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  getColors(req.files.image.data, 'image/gif').then(colors => {
    console.log(colors)
  })
  console.log()
  res.send('File uploaded!')
})

app.listen(3000, () => {
  console.log('Server listening...')
});