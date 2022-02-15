const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/token', authController.refresh);

router.post('/logout', authController.logout);

router.post('/activate', authController.activate);

router.post('/password/change', authController.changePassword);

router.post('/password/forget', authController.forgetPassword);

router.post('/password/forget/verify', authController.forgetPasswordVerify);

router.post('/password/forget/change', authController.forgetPasswordChange);

module.exports = router;
