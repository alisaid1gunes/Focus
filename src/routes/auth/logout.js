const router = require('express').Router();

const authController = require('../../controllers/auth');

const { Logout } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const LogoutService = new Logout(new MongooseService(User));

router.post('/logout', (req, res, next) =>
  authController.logout(req, res, next, LogoutService)
);

module.exports = router;
