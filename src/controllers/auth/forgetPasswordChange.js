/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { ForgetPasswordChange } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ForgetPasswordChangeService = new ForgetPasswordChange(new MongooseService(User));

const forgetPasswordChange = async (req, res, next) => {
  try {
    const result = await ForgetPasswordChangeService.ForgetPasswordChange(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Request is wrong. Error:${err}`));
  }
};

module.exports = forgetPasswordChange;
