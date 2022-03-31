const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const remove = async (req, res, next, ListService) => {
  const { id } = req.params;
  try {
    const result = await ListService.RemoveList(id);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `List could not be deleted. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = remove;
