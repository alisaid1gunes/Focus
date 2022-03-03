const router = require('express').Router();

const upload = require('../utils/uploadProfile');

const authController = require('../controllers/auth');

const verify = require('../middlewares/verifyToken');

router.post('/register', upload.single('profile'), authController.register);

router.post('/login', authController.login);

router.post('/token', authController.refresh);

router.post('/logout', authController.logout);

router.post('/activate', authController.activate);

router.post('/password/change', verify, authController.changePassword);

router.post('/password/forget', authController.forgetPassword);

router.post('/password/forget/verify', authController.forgetPasswordVerify);

router.post('/password/forget/change', authController.forgetPasswordChange);

router.post('/google', authController.googleAuth);

module.exports = router;
