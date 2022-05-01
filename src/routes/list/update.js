const router = require('express').Router();

const listController = require('../../controllers/list');

const verify = require('../../middlewares/verifyToken');

const { Update } = require('../../services/list');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new Update(new MongooseService(List));

router.put('/:id', verify, (req, res, next) =>
  listController.update(req, res, next, ListService)
);

module.exports = router;
