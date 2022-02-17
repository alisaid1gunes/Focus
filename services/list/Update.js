const { List } = require('../../models');

const MongooseService = require('../Mongoose');

const { updateValidation, idValidation } = require('../../validations/list');

class Update {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async UpdateList(body, id) {
    const { idError } = idValidation(body);
    if (idError) return { success: false, error: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, error: updateError.details[0].message };

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
