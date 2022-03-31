/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const register = async (req, res, next, RegisterService) => {
  try {
    const result = await RegisterService.RegisterUser(req);

    if (result.success) {
      res.status(StatusCodes.CREATED);
      res.json(result);
      return res;
    }

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `User could not be registered. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = register;
