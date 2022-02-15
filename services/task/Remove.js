const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

class Remove {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async RemoveTask(id) {
    try {
      await this.mongooseTask.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
