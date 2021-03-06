const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const update = async (req, res, next, TaskService) => {
  const { id } = req.params;
  try {
    const result = await TaskService.UpdateTask(req.body, id);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

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
