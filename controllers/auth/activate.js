/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const ActivateService = require('../../services/auth/ActivateService');

const ActivateServiceInstance = new ActivateService();

const activate = async (req, res, next) => {
  try {
    const result = await ActivateServiceInstance.Activate(req.body);
    console.log(result);
    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(' Aktivasyon işlemi yapılamadı. İstek yanlış')
    );
  }
};

module.exports = { activate };
