const express = require('express');
const router = express();
const {
  addVariable,
  getAllVariables,
  delVariable,
} = require("../controllers/variableController");

router.route("").post(addVariable);
router.route("").get(getAllVariables);
router.route("/:id").delete(delVariable);


module.exports = router;
