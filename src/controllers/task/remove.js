const { StatusCodes } = require('http-status-codes');

const { Remove } = require('../../services/task');

const ApiErrorService = require('../../services/ApiError');

const TaskService = new Remove();

// eslint-disable-next-line consistent-return
const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskService.RemoveTask(id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Task could not be deleted. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = remove;
