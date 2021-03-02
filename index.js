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
  // See: https://github.com/colorjs/get-image-colors/issues/24
  // The get-image-colors package is currently bugged
  // so that if a 'count' of 8 or higher is used, 
  // it returns n - 1 color objects; The following is a quick fix:
  let count = parseInt(req.body.count)
  if (count > 7) {
    count++;
  }
  // Set type and number of colors to return
  const options = {
    type: req.files.image.mimetype,
    count: count
  }

  getColors(req.files.image.data, options).then(colors => {
    res.render('result', { colors })
  })
})

app.listen(3000, () => {
  console.log('Server listening...')
});