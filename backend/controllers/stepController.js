
const multer = require('multer')
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
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // choose your own directory here
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('img');
exports.uploadImg = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    const filename = res.req.file.filename;
    res.send({ filename: filename })
  });
});

