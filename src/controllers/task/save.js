const { StatusCodes } = require('http-status-codes');

const { Save } = require('../../services/task');

const ApiErrorService = require('../../services/ApiError');

const TaskService = new Save();
// eslint-disable-next-line consistent-return
const save = async (req, res, next) => {
  try {
    const result = await TaskService.SaveTask(req.body);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Task could not be saved. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = save;
