const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { GetOne } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new GetOne(new MongooseService(Task));

router.get('/:id', verify, verify, (req, res, next, TaskService) =>
  taskController.getOne(req, res, next, TaskService)
);

module.exports = router;
