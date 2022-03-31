const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const getOne = async (req, res, next, ListService) => {
  try {
    const result = await ListService.GetTask(req.params.id);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }
    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `List could not be found. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = getOne;
