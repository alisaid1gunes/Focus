const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { getOneValidation } = require('../../validations/list');

class GetOne {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async GetTask(id) {
    const { error } = getOneValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      const result = await this.mongooseList.get({ _id: id });

      if (result) return { result, success: true };

      return { success: false, error: 'kayıt bulunamadı' };
    } catch (err) {
      return { success: false, error: `Kayıt bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetOne;
