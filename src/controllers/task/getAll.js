const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const getAll = async (req, res, next, TaskService) => {
  try {
    const result = await TaskService.GetTask(req.params.id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `Tasks could not be found. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = getAll;
