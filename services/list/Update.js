const { List } = require('../../models');

const MongooseService = require('../Mongoose');

class Update {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async UpdateList(body, id) {
    try {
      const result = await this.mongooseList.update(id, body);

      if (result) return { result, success: true };
      return { success: false, error: 'Güncelleme yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt güncellenemedi. Hata:${err}` };
    }
  }
}
module.exports = Update;
