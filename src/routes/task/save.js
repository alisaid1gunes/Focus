const router = require('express').Router();

const taskController = require('../../controllers/task');

const verify = require('../../middlewares/verifyToken');

const { Save } = require('../../services/task');

const MongooseService = require('../../services/Mongoose');

const { Task } = require('../../models');

const TaskService = new Save(new MongooseService(Task));

router.post('/', verify, (req, res, next, TaskService) =>
  taskController.save(req, res, next, TaskService)
);

module.exports = router;
