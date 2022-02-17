const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { getValidation } = require('../../validations/user');

class Get {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async GetUser(id) {
    const { error } = getValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      const result = await this.mongooseUser.get({ _id: id });

      if (result) return { result, success: true };

      return { success: false, error: 'kayıt bulunamadı' };
    } catch (err) {
      return { success: false, error: `Kayıt bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = Get;
