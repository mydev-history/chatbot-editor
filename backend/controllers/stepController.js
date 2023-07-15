
const catchAsync = require('../middlewares/catchAsync');
const Step = require('../models/stepModel');


// Get all steps
exports.getAllSteps = catchAsync(async (req, res, next) => {
  const allSteps = await Step.find();
  res.send(allSteps);
})

// Add new step
exports.newStep = catchAsync(async (req, res, next) => {
  const step = new Step(req.body);
  const newStep = await step.save();
  res.send(newStep);
});
// Replace step
exports.replaceStep = catchAsync(async (req, res, next) => {
  const { key, x, y, elements } = req.body;
  const id = req.params.stepId;
  await Step.findByIdAndUpdate(id, { key, x, y, elements }, { new: true });
  const replaceStep = await Step.findById(id);
  res.send(replaceStep);
});

exports.delStep = catchAsync(async (req, res, next) => {
  const id = req.params.stepId;
  const delStep = await Step.findOneAndDelete({ _id: id });
  res.send(delStep);
})

