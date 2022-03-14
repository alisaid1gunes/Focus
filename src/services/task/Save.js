const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { saveValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task._id=';

const expirationTime = 600000;
class Save {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async SaveTask(body) {
    const { error } = saveValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    try {
      const result = await this.mongooseTask.save(body);

      if (result) {
        // eslint-disable-next-line no-underscore-dangle
        this.redisCacheService.setCache(result._id, result);
        return { success: true, message: 'Task saved.' };
      }

      return { success: false, message: 'Task could not be saved.' };
    } catch (err) {
      return {
        success: false,
        message: `Task could not be saved. Error:${err}`,
      };
    }
  }
}
module.exports = Save;
