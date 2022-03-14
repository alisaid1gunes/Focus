const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { saveValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'list._id=';

const expirationTime = 600000;
class Save {
  constructor() {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async SaveList(body) {
    const { error } = saveValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    try {
      const result = await this.mongooseList.save(body);

      if (result) {
        // eslint-disable-next-line no-underscore-dangle
        this.redisCacheService.setCache(result._id, result);
        return { success: true, message: 'List saved.' };
      }

      return { success: false, message: 'List could not be saved.' };
    } catch (err) {
      return {
        success: false,
        message: `List could not be saved. Error:${err}`,
      };
    }
  }
}
module.exports = Save;
