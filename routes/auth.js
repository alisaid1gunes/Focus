const router = require('express').Router();

const registerController = require('../controllers/auth/registerController');

const loginController = require('../controllers/auth/loginController');

const activateController = require('../controllers/auth/activateController');

const refreshController = require('../controllers/auth/refreshController');

const logoutController = require('../controllers/auth/logoutController');

const changePasswordController = require('../controllers/auth/changePasswordController');

const forgetPasswordController = require('../controllers/auth/forgetPasswordController');

const forgetPasswordVerifyController = require('../controllers/auth/forgetPasswordVerifyController');

const forgetPasswordChangeController = require('../controllers/auth/forgetPasswordChangeController');
// eslint-disable-next-line consistent-return
router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.post('/token', refreshController.refresh);

router.post('/logout', logoutController.logout);

router.post('/activate', activateController.activate);

router.post('/password/change', changePasswordController.changePassword);

router.post('/password/forget', forgetPasswordController.forgetPassword);

router.post(
  '/password/forget/verify',
  forgetPasswordVerifyController.forgetPasswordVerify
);

router.post(
  '/password/forget/change',
  forgetPasswordChangeController.forgetPasswordChange
);

module.exports = router;
