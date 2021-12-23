const router = require('express').Router();

const taskController = require('../controllers/taskController');

const verify = require('../middlewares/verifyToken');

router.get('/', verify, taskController.getAll);

router.get('/:id', verify, taskController.get);

router.post('/', verify, taskController.save);

router.delete('/:id', verify, taskController.remove);

router.put('/:id', verify, taskController.update);

module.exports = router;
