const router = require('express').Router();

const listController = require('../../controllers/list');

const verify = require('../../middlewares/verifyToken');

const { Remove } = require('../../services/list');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new Remove(new MongooseService(List));

router.delete('/:id', verify, (req, res, next) =>
  listController.remove(req, res, next, ListService)
);

module.exports = router;
