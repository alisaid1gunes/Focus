const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { Remove } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new Remove(new MongooseService(Task));

router.delete('/:id', verify, (req, res, next, TaskService) =>
  taskController.remove(req, res, next, TaskService)
);

module.exports = router;
