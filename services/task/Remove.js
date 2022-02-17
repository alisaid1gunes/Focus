const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/task');

class Remove {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async RemoveTask(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      await this.mongooseTask.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
