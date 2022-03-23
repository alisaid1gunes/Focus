const { updateValidation, idValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task._id=';

const expirationTime = 600000;
class Update {
  constructor(MongooseService) {
    this.mongooseTask = MongooseService;
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async UpdateTask(body, id) {
    try {
      const { idError } = idValidation(body);
      if (idError)
        return { success: false, message: idError.details[0].message };

      const { updateError } = updateValidation(body);
      if (updateError)
        return { success: false, message: updateError.details[0].message };

      const result = await this.mongooseTask.update(id, body);

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { success: true, message: 'Task updated.' };
      }
      return { success: false, message: 'Task could not be updated.' };
    } catch (err) {
      return {
        success: false,
        message: `Task could not be updated. Error:${err}`,
      };
    }
  }
}
module.exports = Update;
