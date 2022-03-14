const { StatusCodes } = require('http-status-codes');

const { Update } = require('../../services/task');

const ApiErrorService = require('../../services/ApiError');

const TaskService = new Update();
// eslint-disable-next-line consistent-return
const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskService.UpdateTask(req.body, id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Task could not be updated. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = update;
