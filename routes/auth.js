const router = require('express').Router();

const registerController = require('../controllers/auth/register');

const loginController = require('../controllers/auth/login');

const activateController = require('../controllers/auth/activate');

const refreshController = require('../controllers/auth/refresh');

const logoutController = require('../controllers/auth/logout');

const changePasswordController = require('../controllers/auth/changePassword');

const forgetPasswordController = require('../controllers/auth/forgetPassword');

const forgetPasswordVerifyController = require('../controllers/auth/forgetPasswordVerify');

const forgetPasswordChangeController = require('../controllers/auth/forgetPasswordChange');
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
