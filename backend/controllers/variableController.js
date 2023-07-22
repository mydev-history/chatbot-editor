const catchAsync = require("../middlewares/catchAsync");
const Variable = require("../models/variableModel");

exports.addVariable = catchAsync(async (req, res, next) => {
  const existV = await Variable.findOne({ vname: req.body.vname });
  if (existV) {
    res.send({ msg: "existed" });
  }
  else {
    const variable = new Variable(req.body);
    const newVariable = await variable.save();
    res.send(newVariable);
  }

});

exports.getAllVariables = catchAsync(async (req, res, next) => {
  const variables = await Variable.find();
  res.send(variables);
});

exports.delVariable = catchAsync(async (req, res, next) => {
  console.log(req.params.id)
  const id = req.params.id;
  await Variable.findByIdAndDelete(id);
  res.send({ id: id });
});
