const { StatusCodes } = require('http-status-codes');

const AuthService = require('../services/AuthService');

const ApiErrorService = require('../services/ApiErrorService').default;

const AuthServiceInstance = new AuthService();

const register = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.RegisterUser(req.body);
    if (result) return res.status(StatusCodes.CREATED).send(result);
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
    const result = await AuthServiceInstance.LoginUser(req.body);

    if (result) {
      const { accessToken } = result;
      const { refreshToken } = result;
      return res
        .header('auth-token', accessToken)
        .send({ accessToken, refreshToken });
    }
  } catch (err) {
    next(ApiErrorService.unauthorized('Kullanıcı girişi yapılamadı.'));
  }
};
const logout = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.LogoutUser(req.body);

    if (result) res.status(StatusCodes.OK).send(result);
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
    const result = await AuthServiceInstance.Refresh(req.body);

    if (result) res.status(StatusCodes.OK).send(result);
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Token yenileme işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
};
