/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const logout = async (req, res, next, LogoutService) => {
  try {
    const result = await LogoutService.LogoutUser(req.body);

    if (result.success) {
      res.header('auth-token', '');
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

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
