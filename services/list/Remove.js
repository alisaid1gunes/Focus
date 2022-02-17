const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/list');

class Remove {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async RemoveList(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      await this.mongooseList.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
