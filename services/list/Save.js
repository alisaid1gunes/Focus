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
    if (error) return { success: false, error: error.details[0].message };

    try {
      const result = await this.mongooseList.save(body);

      if (result) {
        // eslint-disable-next-line no-underscore-dangle
        this.redisCacheService.setCache(result._id, result);
        return { success: true, message: 'Kayıt yapıldı.' };
      }

      return { success: false, error: 'Kayıt yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt yapılamadı. Hata:${err}` };
    }
  }
}
module.exports = Save;
