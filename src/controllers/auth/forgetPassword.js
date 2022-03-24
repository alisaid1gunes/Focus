/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const forgetPassword = async (req, res, next, ForgetPasswordService) => {
  try {
    const result = await ForgetPasswordService.ForgetPassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(` Request is wrong. Error:${err}`));
  }
};

module.exports = forgetPassword;
