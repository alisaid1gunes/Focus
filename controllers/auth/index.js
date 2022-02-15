const register = require('./register');

const login = require('./login');

const activate = require('./activate');

const refresh = require('./refresh');

const logout = require('./logout');

const changePassword = require('./changePassword');

const forgetPassword = require('./forgetPassword');

const forgetPasswordVerify = require('./forgetPasswordVerify');

const forgetPasswordChange = require('./forgetPasswordChange');

module.exports = {
  register,
  login,
  activate,
  refresh,
  logout,
  changePassword,
  forgetPassword,
  forgetPasswordVerify,
  forgetPasswordChange,
};
