const router = require('express').Router();

const activate = require('./activate');

const changePassword = require('./changePassword');

const forgetPassword = require('./forgetPassword');

const forgetPasswordChange = require('./forgetPasswordChange');

const forgetPasswordVerify = require('./forgetPasswordVerify');

const google = require('./google');

const login = require('./login');

const logout = require('./logout');

const register = require('./register');

const token = require('./token');

router.use(activate);

router.use(changePassword);

router.use(forgetPassword);

router.use(forgetPasswordChange);

router.use(forgetPasswordVerify);

router.use(google);

router.use(login);

router.use(logout);

router.use(register);

router.use(token);

module.exports = router;
