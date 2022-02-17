const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { updateValidation, idValidation } = require('../../validations/task');

class Update {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async UpdateTask(body, id) {
    try {
      const { idError } = idValidation(body);
      if (idError) return { success: false, error: idError.details[0].message };

      const { updateError } = updateValidation(body);
      if (updateError)
        return { success: false, error: updateError.details[0].message };

      const result = await this.mongooseTask.update(id, body);

      if (result) return { result, success: true };
      return { success: false, error: 'Güncelleme yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt güncellenemedi. Hata:${err}` };
    }
  }
}
module.exports = Update;
