const { StatusCodes } = require('http-status-codes');

const TaskService = require('../services/Task');

const ApiErrorService = require('../services/ApiError').default;

const TaskServiceInstance = new TaskService();

const get = async (req, res, next) => {
  try {
    const result = await TaskServiceInstance.Get(req.params.id);
    if (result.success) res.status(StatusCodes.OK).json(result);
    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

const getAll = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const result = await TaskServiceInstance.GetAll(req.body.userId);
    if (result.success) res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.notFound(result.error));
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıtlar bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

const save = async (req, res, next) => {
  try {
    const result = await TaskServiceInstance.Save(req.body);
    if (result.success) res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(`Kayıt yapılamdı. İstek yanlış. Hata:${err}`)
    );
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskServiceInstance.Update(req.body, id);
    if (result.success) res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `Kayıt güncellenemedi. İstek yanlış. Hata:${err}`
      )
    );
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskServiceInstance.Delete(id);
    if (result.success) res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(`Kayıt silinemedi. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = {
  get,
  getAll,
  save,
  update,
  remove,
};
