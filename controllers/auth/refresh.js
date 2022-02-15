/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const RefreshService = require('../../services/auth/RefreshService');

const RefreshServiceInstance = new RefreshService();

const refresh = async (req, res, next) => {
  try {
    const result = await RefreshServiceInstance.Refresh(req.body);

    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Token yenileme işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};

module.exports = { refresh };
