const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { removeValidation } = require('../../validations/user');

class Remove {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RemoveUser(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    try {
      await this.mongooseUser.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
