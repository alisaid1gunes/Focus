const router = require('express').Router();

const remove = require('./remove');

const update = require('./update');

const save = require('./save');

const getOne = require('./getOne');

const getAll = require('./getAll');

router.use(remove);

router.use(update);

router.use(save);

router.use(getOne);

router.use(getAll);

module.exports = router;
