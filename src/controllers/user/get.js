const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const get = async (req, res, next, UserService) => {
  try {
    const result = await UserService.GetUser(req.params.id);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `User could not be found. Request is wrong.Error:${err}`
      )
    );
  }
};

module.exports = get;
