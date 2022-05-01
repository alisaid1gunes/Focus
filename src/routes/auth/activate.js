const router = require('express').Router();

const authController = require('../../controllers/auth');

const { Activate } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ActivateService = new Activate(new MongooseService(User));

router.post('/activate', (req, res, next) =>
  authController.activate(req, res, next, ActivateService)
);

module.exports = router;
