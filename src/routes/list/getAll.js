const router = require('express').Router();

const listController = require('../../controllers/list');

const verify = require('../../middlewares/verifyToken');

const { GetAll } = require('../../services/list');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new GetAll(new MongooseService(List));

router.get('/all/:id', verify, (req, res, next, ListService) =>
  listController.getAll(req, res, next, ListService)
);

module.exports = router;
