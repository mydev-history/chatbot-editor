const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const animal = require('./routes/animalRoute');
const step = require('./routes/stepRoute');
const canvas = require('./routes/canvasRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
mongoose.connect('mongodb://127.0.0.1:27017/mydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error(err));
// });
app.use('/api/animal', animal);
app.use('/api/ai_step', step);
app.use('/api/ai_canvas', canvas);
app.use("/uploads", express.static(path.join("backend/uploads")));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}🚀`));