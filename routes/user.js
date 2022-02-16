const router = require('express').Router();

const userController = require('../controllers/user');

const verify = require('../middlewares/verifyToken');

router.get('/:id', verify, userController.get);

router.delete('/:id', verify, userController.remove);

router.put('/:id', verify, userController.update);

module.exports = router;
