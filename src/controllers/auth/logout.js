/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Logout } = require('../../services/auth');

const LogoutService = new Logout();

const logout = async (req, res, next) => {
  try {
    const result = await LogoutService.LogoutUser(req.body);

    if (result.success)
      return res.header('auth-token', '').status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `User could not be logged out. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = logout;