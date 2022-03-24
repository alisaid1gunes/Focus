const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { GetAll } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new GetAll(new MongooseService(Task));

router.get('/all/:id', verify, (req, res, next, TaskService) =>
  taskController.getAll(req, res, next, TaskService)
);

module.exports = router;
