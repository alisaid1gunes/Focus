const router = require('express').Router();

const authController = require('../../controllers/auth');

const { Refresh } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { RefreshToken } = require('../../models');

const RefreshService = new Refresh(new MongooseService(RefreshToken));

router.post('/token', (req, res, next) =>
  authController.refresh(req, res, next, RefreshService)
);

module.exports = router;
