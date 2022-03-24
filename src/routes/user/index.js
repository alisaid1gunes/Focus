const router = require('express').Router();

const get = require('./get');

const remove = require('./remove');

const update = require('./update');

router.use(get);
router.use(remove);
router.use(update);

module.exports = router;
