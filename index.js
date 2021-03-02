if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// TODO: file upload validation

const express = require('express');
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

// Temporary routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  getColors(req.files.image.data, req.files.image.mimetype).then(colors => {
    console.log(colors)
    res.render('result', { colors })
  })
})

app.listen(3000, () => {
  console.log('Server listening...')
});