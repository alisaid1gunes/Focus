const { Task } = require('../../models');

const { removeValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task._id=';

const expirationTime = 600000;
class Remove {
  constructor(MongooseService) {
    this.mongooseTask = new MongooseService(Task);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async RemoveTask(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, message: error.details[0].message };

    try {
      await this.mongooseTask.delete({ _id: id });

      await this.redisCacheService.clearCache(id);

      return { message: 'Task deleted', success: true };
    } catch (err) {
      return {
        success: false,
        message: `Tasks could not be deleted. Error:${err}`,
      };
    }
  }
}
module.exports = Remove;
