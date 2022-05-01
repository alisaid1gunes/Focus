const router = require('express').Router();

const authController = require('../../controllers/auth');

const { Login } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User, RefreshToken } = require('../../models');

const LoginService = new Login(
  new MongooseService(User),
  new MongooseService(RefreshToken)
);

router.post('/login', (req, res, next) =>
  authController.login(req, res, next, LoginService)
);

module.exports = router;
