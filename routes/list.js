const router = require('express').Router();

const listController = require('../controllers/list');

const verify = require('../middlewares/verifyToken');

router.get('/all/:id', listController.getAll);

router.get('/:id',  listController.getOne);

router.post('/',  listController.save);

router.delete('/:id',  listController.remove);

router.put('/:id',  listController.update);

module.exports = router;
