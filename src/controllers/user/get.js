const { StatusCodes } = require('http-status-codes');

const { Get } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const MongooseService = require('../../services/Mongoose');

const UserService = new Get(MongooseService);

// eslint-disable-next-line consistent-return
const get = async (req, res, next) => {
  try {
    const result = await UserService.GetUser(req.params.id);
    if (result.success) return res.status(StatusCodes.OK).json(result);
    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `User could not be found. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = get;
