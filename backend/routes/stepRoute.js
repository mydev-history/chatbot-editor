const express = require('express');
const router = express();
const {
  newStep,
  replaceStep,
  getAllSteps,
  delStep,
} = require('../controllers/stepController');

router.route("").post(newStep);
router.route("/:stepId").put(replaceStep);
router.route("").get(getAllSteps);
router.route("/:stepId").delete(delStep);


module.exports = router;