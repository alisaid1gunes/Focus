const router = require('express').Router();

const authController = require('../../controllers/auth');

const verify = require('../../middlewares/verifyToken');

const { ChangePassword } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ChangePasswordService = new ChangePassword(new MongooseService(User));

router.post(
  '/password/change',
  verify,
  (req, res, next, ChangePasswordService) =>
    authController.changePassword(req, res, next, ChangePasswordService)
);

module.exports = router;
