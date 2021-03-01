const express = require('express');
const ejsMate = require('ejs-mate');
const path    = require('path');
const app     = express();

// App setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('test')
});

app.listen(3000, () => {
  console.log('Server listening...')
});