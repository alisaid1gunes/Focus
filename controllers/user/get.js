const { StatusCodes } = require('http-status-codes');

const { Get } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const UserService = new Get();

// eslint-disable-next-line consistent-return
const getOne = async (req, res, next) => {
  try {
    const result = await UserService.GetTask(req.params.id);
    if (result.success) return res.status(StatusCodes.OK).json(result);
    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = getOne;
