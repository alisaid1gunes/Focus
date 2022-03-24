const router = require('express').Router();

const { Get } = require('../../services/user');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const UserService = new Get(new MongooseService(User));

const userController = require('../../controllers/user');

const verify = require('../../middlewares/verifyToken');

router.get('/:id', verify, (req, res, next) =>
  userController.get(req, res, next, UserService)
);

module.exports = router;
