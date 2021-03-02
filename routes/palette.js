const express = require('express');
const palette = require('../controllers/palette');
const router = express.Router();

router.route('/')
  .get(palette.renderIndex)
  .post(palette.findPalette)

module.exports = router;