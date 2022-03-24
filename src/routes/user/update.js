const router = require('express').Router();

const { Update } = require('../../services/user');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const UserService = new Update(new MongooseService(User));

const userController = require('../../controllers/user');

const verify = require('../../middlewares/verifyToken');

const upload = require('../../utils/uploadProfile');

router.put('/:id', verify, upload.single('profile'), (req, res, next) =>
  userController.update(req, res, next, UserService)
);

module.exports = router;
