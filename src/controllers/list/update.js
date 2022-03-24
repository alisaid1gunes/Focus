const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const update = async (req, res, next, ListService) => {
  const { id } = req.params;

  try {
    const result = await ListService.UpdateList(req.body, id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `List could not be updated. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = update;
