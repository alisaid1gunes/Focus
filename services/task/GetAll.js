const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { getAllValidation } = require('../../validations/task/getAll');

class GetAll {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async GetTask(userId) {
    const { error } = getAllValidation(userId);
    if (error) return { success: false, error: error.details[0].message };

    try {
      const result = await this.mongooseTask.getAllWithQuery({ userId });

      if (result) return { result, success: true };

      return { success: false, error: ' Hiç kayıt yok' };
    } catch (err) {
      return { success: false, error: `Kayıtlar bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetAll;
