const { List } = require('../../models');

const { getAllValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'user._id=';

const expirationTime = 600000;
class GetAll {
  constructor(MongooseService) {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetList(userId) {
    const { error } = getAllValidation(userId);
    if (error) return { success: false, message: error.details[0].message };

    const data = await this.redisCacheService.getCache(userId);
    if (data != null) return { data, success: true, message: 'List found.' };

    try {
      const result = await this.mongooseList.getAllWithQuery({ userId });

      if (result) {
        this.redisCacheService.setCache(userId, result);
        return { result, success: true, message: 'List found.' };
      }

      return { success: false, message: 'There is no List' };
    } catch (err) {
      return { success: false, message: `There is no List.  Error:${err}` };
    }
  }
}
module.exports = GetAll;
