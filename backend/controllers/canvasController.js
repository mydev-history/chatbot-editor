
const catchAsync = require('../middlewares/catchAsync');
const Canvas = require('../models/canvasModel');
const { findOneAndReplace } = require('../models/stepModel');

//Get all Lines
exports.getLines = catchAsync(async (req, res, next) => {
  const allLines = await Canvas.find();
  res.send(allLines);
})

// Add new Line
exports.newLine = catchAsync(async (req, res, next) => {
  const canvas = new Canvas(req.body);
  const dupSpLine = await Canvas.findOne({ sp_id: req.body.sp_id });
  if (!dupSpLine) {
    const newLine = await canvas.save();
    res.send(newLine);
  }
  else {
    await Canvas.findOneAndReplace({ sp_id: req.body.sp_id }, req.body, { new: true });
    const replaceLine = await Canvas.findOne({ sp_id: req.body.sp_id });
    res.send(replaceLine);
  }
});

exports.delLine = catchAsync(async (req, res, next) => {
  const sp_id = req.params.sp_id;
  const delLine = await Canvas.findOneAndDelete({ sp_id });
  res.send(delLine);
});

