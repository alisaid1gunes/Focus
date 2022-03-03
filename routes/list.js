const router = require('express').Router();

const listController = require('../controllers/list');

const verify = require('../middlewares/verifyToken');

router.get('/all/:id', verify, listController.getAll);

router.get('/:id', verify, listController.getOne);

router.post('/', verify, listController.save);

router.delete('/:id', verify, listController.remove);

router.put('/:id', verify, listController.update);

module.exports = router;
