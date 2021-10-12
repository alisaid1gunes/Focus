const router = require('express').Router();

const tokenController = require('../controllers/tokenController');
// eslint-disable-next-line consistent-return
router.post('/token', tokenController.refresh);

module.exports = router;
