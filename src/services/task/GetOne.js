const { Task } = require('../../models');

const { getOneValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task._id=';

const expirationTime = 600000;
class GetOne {
  constructor(MongooseService) {
    this.mongooseTask = MongooseService;
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetTask(id) {
    const { error } = getOneValidation(id);
    if (error) return { success: false, message: error.details[0].message };

    const data = await this.redisCacheService.getCache(id);
    if (data != null) {
      return { data, success: true, message: 'Task found' };
    }

    try {
      const result = await this.mongooseTask.get({ _id: id });

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { result, success: true, message: 'Task found' };
      }

      return { success: false, message: 'Task could not be found.' };
    } catch (err) {
      return { success: false, error: `Task could not be found. Error:${err}` };
    }
  }
}
module.exports = GetOne;
