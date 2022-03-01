const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { updateValidation, idValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'list.id=';

const expirationTime = 300;
class Update {
  constructor() {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async UpdateList(body, id) {
    const { idError } = idValidation(body);
    if (idError) return { success: false, error: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, error: updateError.details[0].message };

    try {
      const result = await this.mongooseList.update(id, body);

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { success: true, message: 'Kayıt yapıldı.' };
      }
      return { success: false, error: 'Güncelleme yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt güncellenemedi. Hata:${err}` };
    }
  }
}
module.exports = Update;
