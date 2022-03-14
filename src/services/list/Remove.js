const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/list');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'list._id=';

const expirationTime = 600000;
class Remove {
  constructor() {
    this.mongooseList = new MongooseService(List);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async RemoveList(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, message: error.details[0].message };

    await this.mongooseTask.delete({ _id: id });

    await this.redisCacheService.clearCache(id);

    try {
      await this.mongooseList.delete({ _id: id });
      return { message: 'List deleted.', success: true };
    } catch (err) {
      return {
        success: false,
        message: `List could not be deleted. Error:${err}`,
      };
    }
  }
}
module.exports = Remove;
