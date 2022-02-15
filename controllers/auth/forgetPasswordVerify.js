/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const ForgetPasswordVerify = require('../../services/auth/ForgetPasswordVerify');

const ForgetPasswordVerifyService = new ForgetPasswordVerify();

const forgetPasswordVerify = async (req, res, next) => {
  try {
    const result = await ForgetPasswordVerifyService.ForgetPasswordVerify(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`İşlem gerçekleştirilemedi.${err}`));
  }
};

module.exports = { forgetPasswordVerify };
