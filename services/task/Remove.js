const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task.id=';

const expirationTime = 300;
class Remove {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async RemoveTask(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      await this.mongooseTask.delete({ _id: id });

      (async () => {
        await this.redisCacheService.clearCache(id);
      })();

      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
