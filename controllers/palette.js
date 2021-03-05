const getColors = require('get-image-colors');
const imageType = require('image-type');

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

  if (imageType(req.files.image.data) == null) {
    req.flash('error', 'Submitted file is not an image.');
    return res.redirect('/');
  }

  // Convert submitted image to base64 string to use as image src on result page
  const mimetype = req.files.image.mimetype;
  const imageBuffer = req.files.image.data;
  const b64encoded = imageBuffer.toString('base64');
  const data = `data:${mimetype};base64,${b64encoded}`;

  // Set type and number of colors to return
  const options = {
    type: mimetype,
    count: count
  }
  // Pass image buffer and options to getColors() and render result
  getColors(imageBuffer, options).then(colors => {
    res.render('result', { colors, data })
  })
}