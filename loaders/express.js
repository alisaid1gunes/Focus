const express = require('express');

const helmet = require('helmet');

const compression = require('compression');

const cors = require('cors');

const apiErrorHandler = require('../middlewares/apiErrorHandler');

const auth = require('../routes/auth');

const task = require('../routes/task');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(compression({ threshold: 6 }));

  app.use(cors());

  app.use('/api/users', auth);

  app.use('/api/tasks', task);

  app.use(apiErrorHandler);
};
