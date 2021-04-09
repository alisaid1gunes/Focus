const router = require('express').Router();

const authController = require('../controllers/authController');
// eslint-disable-next-line consistent-return
router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;
