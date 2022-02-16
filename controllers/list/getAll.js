const { StatusCodes } = require('http-status-codes');

const { GetAll } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const ListService = new GetAll();

// eslint-disable-next-line consistent-return
const getAll = async (req, res, next) => {
  try {
    const result = await ListService.GetTask(req.params.id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = getAll;
