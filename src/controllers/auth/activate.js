/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Activate } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ActivateService = new Activate(new MongooseService(User));

const activate = async (req, res, next) => {
  try {
    const result = await ActivateService.Activate(req.body);
    console.log(result);
    if (result.success) return res.status(StatusCodes.OK).send(result);

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
