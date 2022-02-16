const { List } = require('../../models');

const MongooseService = require('../Mongoose');

class Save {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async SaveList(body) {
    try {
      const result = await this.mongooseList.save(body);

      if (result) return { success: true, message: 'Kayıt yapıldı.' };

      return { success: false, error: 'Kayıt yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt yapılamadı. Hata:${err}` };
    }
  }
}
module.exports = Save;
