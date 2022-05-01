const router = require('express').Router();

const listController = require('../../controllers/list');

const verify = require('../../middlewares/verifyToken');

const { GetOne } = require('../../services/list');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new GetOne(new MongooseService(List));

router.get('/:id', verify, (req, res, next) =>
  listController.getOne(req, res, next, ListService)
);

module.exports = router;
