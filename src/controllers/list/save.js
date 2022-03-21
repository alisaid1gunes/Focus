const { StatusCodes } = require('http-status-codes');

const { Save } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new Save(new MongooseService(List));
// eslint-disable-next-line consistent-return
const save = async (req, res, next) => {
  try {
    const result = await ListService.SaveList(req.body);
    if (result.success) return res.status(StatusCodes.OK).json(result);

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
