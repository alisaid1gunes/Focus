const router = require('express').Router();

const taskController = require('../controllers/task');

const verify = require('../middlewares/verifyToken');

router.get('/all/:id', taskController.getAll);

router.get('/:id', taskController.getOne);

router.post('/', taskController.save);

router.delete('/:id', taskController.remove);

router.put('/:id', taskController.update);

module.exports = router;
