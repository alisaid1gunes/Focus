const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { getOneValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'list._id=';

const expirationTime = 600000;
class GetOne {
  constructor() {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetList(id) {
    const { error } = getOneValidation(id);
    if (error) return { success: false, message: error.details[0].message };

    const data = await this.redisCacheService.getCache(id);
    if (data != null) return { data, success: true, message: 'List found' };

    try {
      const result = await this.mongooseList.get({ _id: id });

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { result, success: true, message: 'List found.' };
      }

      return { success: false, message: 'There is no List.' };
    } catch (err) {
      return { success: false, message: `There is no List. Error:${err}` };
    }
  }
}
module.exports = GetOne;
