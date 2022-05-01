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
        accessToken,
        username: result.username,
        refreshToken,
        message: result.message,
        success: result.success,
      });
      return res;
    }
    next(ApiErrorService.unauthorized(result.message));
  } catch (err) {
    next(
      ApiErrorService.unauthorized(
        `User could not be logged in. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = login;
