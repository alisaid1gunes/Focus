const Activate = require('./Activate');

const ChangePassword = require('./ChangePassword');

const { ForgetPassword, forgetEmitter } = require('./ForgetPassword');

const ForgetPasswordChange = require('./ForgetPasswordChange');

const ForgetPasswordVerify = require('./ForgetPasswordVerify');

const Login = require('./Login');

const Logout = require('./Logout');

const Refresh = require('./Refresh');

const { Register, registerEmitter } = require('./Register');

module.exports = {
  Activate,
  ChangePassword,
  ForgetPassword,
  ForgetPasswordChange,
  ForgetPasswordVerify,
  Login,
  Logout,
  Refresh,
  Register,
  registerEmitter,
  forgetEmitter,
};
