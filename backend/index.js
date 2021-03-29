const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const auth = require('./routes/auth');

const task = require('./routes/task');

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  }
);
app.use(express.json());

app.use('/api/user', auth);

app.use('/api/task', task);

app.listen(5000, () => {
  console.log('server running');
});
