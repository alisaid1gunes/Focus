/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const {
  ForgetPasswordService,
} = require('../../services/auth/ForgetPasswordService');

const ForgetPasswordServiceInstance = new ForgetPasswordService();

const forgetPassword = async (req, res, next) => {
  try {
    const result = await ForgetPasswordServiceInstance.ForgetPassword(req.body);

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

module.exports = { forgetPassword };
