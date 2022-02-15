/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const Login = require('../../services/auth/Login');

const LoginService = new Login();

const login = async (req, res, next) => {
  try {
    const result = await LoginService.LoginUser(req.body);

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
