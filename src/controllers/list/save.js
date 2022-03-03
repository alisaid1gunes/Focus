const { StatusCodes } = require('http-status-codes');

const { Save } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const ListService = new Save();
// eslint-disable-next-line consistent-return
const save = async (req, res, next) => {
  try {
    const result = await ListService.SaveList(req.body);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(`Kayıt yapılamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = save;
