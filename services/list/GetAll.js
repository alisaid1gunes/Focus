const { List } = require('../../models');

const MongooseService = require('../Mongoose');

class GetAll {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async GetList(userId) {
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
