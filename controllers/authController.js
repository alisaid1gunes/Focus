/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const { AuthService } = require('../services/AuthService');

const ApiErrorService = require('../services/ApiErrorService');

const { RegisterService } = require('../services/auth/RegisterService');

const LoginService = require('../services/auth/LoginService');

const LogoutService = require('../services/auth/LogoutService');

const RefreshService = require('../services/auth/RefreshService');

const ActivateService = require('../services/auth/ActivateService');

const ChangePasswordService = require('../services/auth/ChangePasswordService');

const ForgetPasswordVerifyService = require('../services/auth/ForgetPasswordVerifyService');

const {
  ForgetPasswordService,
} = require('../services/auth/ForgetPasswordService');

const ForgetPasswordChangeService = require('../services/auth/ForgetPasswordChangeService');

const AuthServiceInstance = new AuthService();

const RegisterServiceInstance = new RegisterService();

const LoginServiceInstance = new LoginService();

const LogoutServiceInstance = new LogoutService();

const RefreshServiceInstance = new RefreshService();

const ActivateServiceInstance = new ActivateService();

const ChangePasswordServiceInstance = new ChangePasswordService();

const ForgetPasswordServiceInstance = new ForgetPasswordService();

const ForgetPasswordVerifyServiceInstance = new ForgetPasswordVerifyService();

const ForgetPasswordChangeServiceInstance = new ForgetPasswordChangeService();

const register = async (req, res, next) => {
  try {
    const result = await RegisterServiceInstance.RegisterUser(req.body);

    if (result.success) return res.status(StatusCodes.CREATED).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Kullanıcı kayıt işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};

const login = async (req, res, next) => {
  try {
    const result = await LoginServiceInstance.LoginUser(req.body);

    if (result.success) {
      const { accessToken } = result;
      const { refreshToken } = result;
      return res.header('auth-token', accessToken).status(StatusCodes.OK).send({
        accessToken,
        refreshToken,
        error: result.error,
        succes: result.success,
      });
    }
    next(ApiErrorService.unauthorized(result.error));
  } catch (err) {
    next(ApiErrorService.unauthorized(`Kullanıcı girişi yapılamadı.${err}`));
  }
};
const logout = async (req, res, next) => {
  try {
    const result = await LogoutServiceInstance.LogoutUser(req.body);

    if (result.success)
      return res.header('auth-token', '').status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Kullanıcı çıkış işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};
const refresh = async (req, res, next) => {
  try {
    const result = await RefreshServiceInstance.Refresh(req.body);

    if (result.success) res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Token yenileme işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};

const activate = async (req, res, next) => {
  try {
    const result = await ActivateServiceInstance.Activate(req.body);
    console.log(result);
    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(' Aktivasyon işlemi yapılamadı. İstek yanlış')
    );
  }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await ChangePasswordServiceInstance.ChangePassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Kullanıcı girişi yapılamadı.${err}`));
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const result = await ForgetPasswordServiceInstance.ForgetPassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`İşlem gerçekleştirilemedi.${err}`));
  }
};

const forgetPasswordVerify = async (req, res, next) => {
  try {
    const result = await ForgetPasswordVerifyServiceInstance.ForgetPasswordVerify(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`İşlem gerçekleştirilemedi.${err}`));
  }
};

const forgetPasswordChange = async (req, res, next) => {
  try {
    const result = await ForgetPasswordChangeServiceInstance.ForgetPasswordChange(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`İşlem gerçekleştirilemedi.${err}`));
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
  activate,
  changePassword,
  forgetPassword,
  forgetPasswordVerify,
  forgetPasswordChange,
};
