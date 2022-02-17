const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { getOneValidation } = require('../../validations/task');

class GetOne {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async GetTask(id) {
    const { error } = getOneValidation(id);
    if (error) return { success: false, error: error.details[0].message };

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
