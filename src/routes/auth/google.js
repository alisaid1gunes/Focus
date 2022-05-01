const router = require('express').Router();

const authController = require('../../controllers/auth');

const { GoogleAuth } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User, RefreshToken } = require('../../models');

const GoogleAuthService = new GoogleAuth(
  new MongooseService(User),
  new MongooseService(RefreshToken)
);

router.post('/google', (req, res, next) =>
  authController.googleAuth(req, res, next, GoogleAuthService)
);

module.exports = router;
