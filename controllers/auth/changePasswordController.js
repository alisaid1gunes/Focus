/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const ChangePasswordService = require('../../services/auth/ChangePasswordService');

const ChangePasswordServiceInstance = new ChangePasswordService();

const changePassword = async (req, res, next) => {
  try {
    const result = await ChangePasswordServiceInstance.ChangePassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Kullanıcı girişi yapılamadı.${err}`));
  }
};

module.exports = { changePassword };
