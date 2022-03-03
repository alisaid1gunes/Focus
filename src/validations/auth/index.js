const loginValidation = require('./login');

const registerValidation = require('./register');

const logoutValidation = require('./logout');

const refreshvalidation = require('./refresh');

const activateValidation = require('./activate');

const changePasswordValidation = require('./changePassword');

const forgetPasswordValidation = require('./forgetPassword');

const forgetPasswordVerifyValidation = require('./forgetPasswordVerify');

const forgetPasswordChangeValidation = require('./forgetPasswordChange');

module.exports = {
  registerValidation,
  loginValidation,
  logoutValidation,
  refreshvalidation,
  activateValidation,
  changePasswordValidation,
  forgetPasswordValidation,
  forgetPasswordVerifyValidation,
  forgetPasswordChangeValidation,
};
