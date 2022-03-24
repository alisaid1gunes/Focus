const router = require('express').Router();

const upload = require('../../utils/uploadProfile');

const authController = require('../../controllers/auth');

const { Register } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const RegisterService = new Register(new MongooseService(User));

router.post(
  '/register',
  upload.single('profile'),
  (req, res, next, RegisterService) =>
    authController.register(req, res, next, RegisterService)
);

module.exports = router;
