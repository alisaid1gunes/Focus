/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const LoginService = require('../../services/auth/LoginService');

const LoginServiceInstance = new LoginService();

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

module.exports = { login };
