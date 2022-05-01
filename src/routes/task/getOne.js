const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { GetOne } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new GetOne(new MongooseService(Task));

router.get('/:id', verify, (req, res, next) =>
  taskController.getOne(req, res, next, TaskService)
);

module.exports = router;
