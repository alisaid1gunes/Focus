const router = require('express').Router();

const taskController = require('../controllers/taskController');

const verify = require('../middlewares/verifyToken');

router.get('/', verify, taskController.getTasks);

router.post('/', verify, taskController.addTask);

router.delete('/', verify, taskController.deleteTask);

router.put('/', verify, taskController.updateTask);

module.exports = router;
