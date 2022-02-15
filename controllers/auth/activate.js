/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const Activate = require('../../services/auth/Activate');

const ActivateService = new Activate();

const activate = async (req, res, next) => {
  try {
    const result = await ActivateService.Activate(req.body);
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
