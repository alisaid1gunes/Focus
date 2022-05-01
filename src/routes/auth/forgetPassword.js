const router = require('express').Router();

const authController = require('../../controllers/auth');

const verify = require('../../middlewares/verifyToken');

const { ForgetPassword } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ForgetPasswordService = new ForgetPassword(new MongooseService(User));

router.post('/password/forget', (req, res, next) =>
  authController.forgetPassword(req, res, next, ForgetPasswordService)
);

module.exports = router;
