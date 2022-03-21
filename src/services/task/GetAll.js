const { Task } = require('../../models');

const { getAllValidation } = require('../../validations/task/getAll');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'user._id=';

const expirationTime = 600000;

class GetAll {
  constructor(MongooseService) {
    this.mongooseTask = new MongooseService(Task);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetTask(userId) {
    const { error } = getAllValidation(userId);
    if (error) return { success: false, message: error.details[0].message };

    const data = await this.redisCacheService.getCache(userId);
    if (data != null) return { data, success: true };

    try {
      const result = await this.mongooseTask.getAllWithQuery({ userId });

      if (result) {
        this.redisCacheService.setCache(userId, result);
        return { result, success: true };
      }

      return { success: false, message: 'There is no task' };
    } catch (err) {
      return { success: false, message: `There is no task. Error:${err}` };
    }
  }
}
module.exports = GetAll;
