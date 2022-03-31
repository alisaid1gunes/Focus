/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const changePassword = async (req, res, next, ChangePasswordService) => {
  try {
    const result = await ChangePasswordService.ChangePassword(req.body);

    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
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
