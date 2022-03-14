const fs = require('fs');

const { promisify } = require('util');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const unlinkAsync = promisify(fs.unlink);

const { removeValidation } = require('../../validations/user');

class Remove {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RemoveUser(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };
    const user = await this.mongooseUser.get({ _id: id });

    if (user) await unlinkAsync(user.profileUrl);

    try {
      await this.mongooseUser.delete({ _id: id });
      return { message: 'User deleted', success: true };
    } catch (err) {
      return {
        success: false,
        message: `User could not be deleted. Error:${err}`,
      };
    }
  }
}
module.exports = Remove;
