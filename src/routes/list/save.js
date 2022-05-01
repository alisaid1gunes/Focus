const router = require('express').Router();

const listController = require('../../controllers/list');

const verify = require('../../middlewares/verifyToken');

const { Save } = require('../../services/list');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new Save(new MongooseService(List));

router.post('/', verify, (req, res, next) =>
  listController.save(req, res, next, ListService)
);

module.exports = router;
