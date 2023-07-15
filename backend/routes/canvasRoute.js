const express = require('express');
const router = express();
const {
  newLine,
  getLines,
  delLine,
} = require('../controllers/canvasController');

router.route("").post(newLine);
router.route("").get(getLines);
router.route("/:sp_id").delete(delLine);

module.exports = router;