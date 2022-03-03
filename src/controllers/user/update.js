const { StatusCodes } = require('http-status-codes');

const { Update } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const UserService = new Update();
// eslint-disable-next-line consistent-return
const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await UserService.UpdateUser(req, id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Kayıt güncellenemedi. İstek yanlış. Hata:${err}`
      )
    );
  }
};

module.exports = update;
