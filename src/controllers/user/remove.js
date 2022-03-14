const { StatusCodes } = require('http-status-codes');

const { Remove } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const UserService = new Remove();

// eslint-disable-next-line consistent-return
const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await UserService.RemoveUser(id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `User could not be removed. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = remove;
