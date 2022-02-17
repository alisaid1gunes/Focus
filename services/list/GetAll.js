const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { getAllValidation } = require('../../validations/list');

class GetAll {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async GetList(userId) {
    const { error } = getAllValidation(userId);
    if (error) return { success: false, error: error.details[0].message };

    try {
      const result = await this.mongooseList.getAllWithQuery({ userId });

      if (result) return { result, success: true };

      return { success: false, error: ' Hiç kayıt yok' };
    } catch (err) {
      return { success: false, error: `Kayıtlar bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetAll;
