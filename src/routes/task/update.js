const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { Update } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new Update(new MongooseService(Task));

router.put('/:id', verify, (req, res, next, TaskService) =>
  taskController.update(req, res, next, TaskService)
);

module.exports = router;
