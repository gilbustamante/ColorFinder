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

  const mimetype = req.files.image.mimetype;
  const imageBuffer = req.files.image.data;
  // const b64encoded = window.btoa(String.fromCharCode.apply(null, imageBuffer));
  const b64encoded = imageBuffer.toString('base64');
  const data = `data:${mimetype};base64,${b64encoded}`;

  // Set type and number of colors to return
  const options = {
    type: mimetype,
    count: count
  }
  // Pass image buffer and options to getColors() and render result
  getColors(req.files.image.data, options).then(colors => {
    res.render('result', { colors, data })
  })
}