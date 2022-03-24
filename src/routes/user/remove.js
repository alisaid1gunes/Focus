const router = require('express').Router();

const { Remove } = require('../../services/user');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const UserService = new Remove(new MongooseService(User));

const userController = require('../../controllers/user');

const verify = require('../../middlewares/verifyToken');

router.delete('/:id', verify, (req, res, next) =>
  userController.remove(req, res, next, UserService)
);

module.exports = router;
