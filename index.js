if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();

// Session setup
const sessionConfig = {
  name: 'GCPFSession',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionConfig));
app.use(flash());

// Middleware for flash locals
app.use((req, res, next) => {
  res.locals.success = req.flash('success'); // If needed
  res.locals.error = req.flash('error');
  next();
});

// App setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// Routes
const paletteRoutes = require('./routes/palette');
app.use('/', paletteRoutes);

app.listen(3000, () => {
  console.log('Server listening...')
});