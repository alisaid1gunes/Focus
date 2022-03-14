/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Register } = require('../../services/auth');

const RegisterService = new Register();

const register = async (req, res, next) => {
  try {
    const result = await RegisterService.RegisterUser(req);

    if (result.success) return res.status(StatusCodes.CREATED).send(result);

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
