const { StatusCodes } = require('http-status-codes');

const { Update } = require('../../services/list');

const ApiErrorService = require('../../services/ApiError');

const MongooseService = require('../../services/Mongoose');

const { List } = require('../../models');

const ListService = new Update(new MongooseService(List));
// eslint-disable-next-line consistent-return
const update = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ListService.UpdateList(req.body, id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `List could not be updated. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = update;
