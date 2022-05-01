const router = require('express').Router();

const authController = require('../../controllers/auth');

const { ForgetPasswordVerify } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ForgetPasswordVerifyService = new ForgetPasswordVerify(
  new MongooseService(User)
);

router.post('/password/forget/verify', (req, res, next) =>
  authController.forgetPasswordVerify(
    req,
    res,
    next,
    ForgetPasswordVerifyService
  )
);

module.exports = router;
