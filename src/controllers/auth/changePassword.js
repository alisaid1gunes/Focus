/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { ChangePassword } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const ChangePasswordService = new ChangePassword(MongooseService);

const changePassword = async (req, res, next) => {
  try {
    const result = await ChangePasswordService.ChangePassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Password could not be changed. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = changePassword;
