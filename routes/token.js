const router = require('express').Router();

const tokenController = require('../controllers/tokenController');

router.post('/token', tokenController.refresh);

module.exports = router;
