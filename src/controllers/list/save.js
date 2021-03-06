const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const save = async (req, res, next, ListService) => {
  try {
    const result = await ListService.SaveList(req.body);
    if (result.success) {
      res.status(StatusCodes.OK);
      res.json(result);
      return res;
    }

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `List could not be saved. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = save;
