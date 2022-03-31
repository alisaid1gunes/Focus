/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const activate = async (req, res, next, ActivateService) => {
  try {
    const result = await ActivateService.Activate(req.body);
    console.log(result);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `User could not be activated. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = activate;
