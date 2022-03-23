const { updateValidation, idValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'list._id=';

const expirationTime = 600000;
class Update {
  constructor(MongooseService) {
    this.mongooseList = MongooseService;
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async UpdateList(body, id) {
    const { idError } = idValidation(body);
    if (idError) return { success: false, message: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, message: updateError.details[0].message };

    try {
      const result = await this.mongooseList.update(id, body);

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { success: true, message: 'List updated.' };
      }
      return { success: false, message: 'List could not be updated.' };
    } catch (err) {
      return {
        success: false,
        message: `List could not be updated. Error:${err}`,
      };
    }
  }
}
module.exports = Update;
