const express = require('express');
const router = express();
const {
  newLine,
  getLines,
  delLine,
  delLines,
  replaceLine,
} = require('../controllers/canvasController');

router.route("").post(newLine);
router.route("").get(getLines);
router.route("/:id").put(replaceLine);
router.route("/:sp_id").delete(delLine);
router.route("/delLines/:id").delete(delLines);

module.exports = router;