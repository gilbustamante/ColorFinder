const getColors = require('get-image-colors');

module.exports.renderIndex = (req, res) => {
  res.render('index');
}

module.exports.findPalette = (req, res) => {
  // The get-image-colors package is currently bugged
  // so that if 'count' is >=8, it returns n - 1 color objects.
  // See: https://github.com/colorjs/get-image-colors/issues/24
  // The following is a quick fix:
  let count = parseInt(req.body.count)
  if (count > 7) {
    count++;
  }
  // Set type and number of colors to return
  const options = {
    type: req.files.image.mimetype,
    count: count
  }
  // Pass image buffer and options to getColors() and render result
  getColors(req.files.image.data, options).then(colors => {
    res.render('result', { colors })
  })
}