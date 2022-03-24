const router = require('express').Router();

const authController = require('../../controllers/auth');

const { ForgetPasswordChange } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ForgetPasswordChangeService = new ForgetPasswordChange(
  new MongooseService(User)
);

router.post(
  '/password/forget/change',
  (req, res, next, ForgetPasswordChangeService) =>
    authController.forgetPasswordChange(
      req,
      res,
      next,
      ForgetPasswordChangeService
    )
);

module.exports = router;
