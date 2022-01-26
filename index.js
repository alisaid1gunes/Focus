const express = require('express');

const helmet = require('helmet');

const compression = require('compression');

const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv');

const cors = require('cors');

const apiErrorHandler = require('./middlewares/apiErrorHandler');

const auth = require('./routes/auth');

const task = require('./routes/task');

dotenv.config();

require('./subscribers/user');

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
    console.log('db connected');
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression({ threshold: 6 }));

app.use(cors());

app.use('/api/users', auth);

app.use('/api/tasks', task);

app.use(apiErrorHandler);
