const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { saveValidation } = require('../../validations/list');

class Save {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async SaveList(body) {
    const { error } = saveValidation(body);
    if (error) return { success: false, error: error.details[0].message };

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
