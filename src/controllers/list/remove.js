const { StatusCodes } = require('http-status-codes');

const { Remove } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const ListService = new Remove();

// eslint-disable-next-line consistent-return
const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await ListService.RemoveList(id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(`List could not be deleted. Request is wrong. Error:${err}`)
    );
  }
};

module.exports = remove;
