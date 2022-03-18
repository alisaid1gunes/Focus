const { StatusCodes } = require('http-status-codes');

const { GetOne } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const ListService = new GetOne();

// eslint-disable-next-line consistent-return
const getOne = async (req, res, next) => {
  try {
    const result = await ListService.GetTask(req.params.id);
    if (result.success) return res.status(StatusCodes.OK).json(result);
    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(`List could not be found. Request is wrong. Error:${err}`)
    );
  }
};

module.exports = getOne;