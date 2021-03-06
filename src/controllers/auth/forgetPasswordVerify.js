/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');


const forgetPasswordVerify = async (req, res, next, ForgetPasswordVerifyService) => {
  try {
    const result = await ForgetPasswordVerifyService.ForgetPasswordVerify(
      req.body
    );

    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Request is wrong. Error:${err}`));
  }
};

module.exports = forgetPasswordVerify;
