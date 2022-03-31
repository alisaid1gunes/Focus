/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const login = async (req, res, next, LoginService) => {
  try {
    const result = await LoginService.LoginUser(req.body);

    if (result.success) {
      const { accessToken } = result;
      const { refreshToken } = result;
      res.header('auth-token', accessToken);
      res.status(StatusCodes.OK);
      res.json({
        username: result.username,
        accessToken,
        refreshToken,
        message: result.message,
        succes: result.success,
      });
      return res;
    }
    next(ApiErrorService.unauthorized(result.error));
  } catch (err) {
    next(
      ApiErrorService.unauthorized(
        `User could not be logged in. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = login;
