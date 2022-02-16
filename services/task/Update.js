const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { taskValidationUpdate } = require('../../validations/validations');

class Update {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async UpdateTask(body, id) {
    try {
      const { error } = taskValidationUpdate(body);
      if (error) return { success: false, error: error.details[0].message };

      const result = await this.mongooseTask.update(id, body);

      if (result) return { result, success: true };
      return { success: false, error: 'Güncelleme yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt güncellenemedi. Hata:${err}` };
    }
  }
}
module.exports = Update;
