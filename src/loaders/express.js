const express = require('express');

const helmet = require('helmet');

const compression = require('compression');

const cors = require('cors');

const apiErrorHandler = require('../middlewares/apiErrorHandler');

const { auth, task, user, list } = require('../routes');

const { swaggerUi, swaggerDocument } = require('./swagger');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(compression({ threshold: 6 }));

  app.use(cors());

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/api/users', user);

  app.use('/api/users/auth', auth);

  app.use('/api/tasks', task);

  app.use('/api/list', list);

  app.use(apiErrorHandler);
};
