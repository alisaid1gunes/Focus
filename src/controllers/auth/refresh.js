/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const refresh = async (req, res, next, RefreshService) => {
  try {
    const result = await RefreshService.Refresh(req.body);

    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

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
