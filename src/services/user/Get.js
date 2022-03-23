const { getValidation } = require('../../validations/user');

class Get {
  constructor(MongooseService) {
    this.mongooseUser = MongooseService;
  }

  async GetUser(id) {
    const { error } = getValidation(id);
    if (error) return { success: false, message: error.details[0].message };

    try {
      const result = await this.mongooseUser.get({ _id: id });

      if (result) return { result, success: true, message: 'User found.' };

      return { success: false, message: 'User could not be found' };
    } catch (err) {
      return {
        success: false,
        message: `User could not be found. Error:${err}`,
      };
    }
  }
}
module.exports = Get;
