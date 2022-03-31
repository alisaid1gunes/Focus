const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const save = async (req, res, next, TaskService) => {
  try {
    const result = await TaskService.SaveTask(req.body);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

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
