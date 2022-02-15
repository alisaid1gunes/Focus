const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

class GetOne {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async GetTask(id) {
    try {
      const result = await this.mongooseTask.get({ _id: id });

      if (result) return { result, success: true };

      return { success: false, error: 'kayıt bulunamadı' };
    } catch (err) {
      return { success: false, error: `Kayıt bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetOne;
