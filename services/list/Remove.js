const { List } = require('../../models');

const MongooseService = require('../Mongoose');

class Remove {
  constructor() {
    this.mongooseList = new MongooseService(List);
  }

  async RemoveList(id) {
    try {
      await this.mongooseList.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = Remove;
