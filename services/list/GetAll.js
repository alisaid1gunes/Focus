const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { getAllValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'user._id=';

const expirationTime = 600000;
class GetAll {
  constructor() {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetList(userId) {
    const { error } = getAllValidation(userId);
    if (error) return { success: false, error: error.details[0].message };

    const data = await this.redisCacheService.getCache(userId);
    if (data != null) return { data, success: true };

    try {
      const result = await this.mongooseList.getAllWithQuery({ userId });

      if (result) {
        this.redisCacheService.setCache(userId, result);
        return { result, success: true };
      }

      return { success: false, error: ' Hiç kayıt yok' };
    } catch (err) {
      return { success: false, error: `Kayıtlar bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetAll;
