const router = require('express').Router();

const taskController = require('../controllers/task');

const verify = require('../middlewares/verifyToken');

router.get('/all/:id', verify, taskController.getAll);

router.get('/:id', verify, taskController.getOne);

router.post('/', verify, taskController.save);

router.delete('/:id', verify, taskController.remove);

router.put('/:id', verify, taskController.update);

module.exports = router;
