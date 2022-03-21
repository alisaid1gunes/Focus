/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Refresh } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const RefreshService = new Refresh(MongooseService);

const refresh = async (req, res, next) => {
  try {
    const result = await RefreshService.Refresh(req.body);

    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Token coud not be retrieved. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = refresh;
