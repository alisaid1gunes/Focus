/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const { changePasswordValidation } = require('../../validations/auth');

class ChangePassword {
  constructor(MongooseService) {
    this.mongooseUser = MongooseService;
  }

  async ChangePassword(body) {
    const { error } = changePasswordValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    if (!user) return { message: 'User could not be found', success: false };

    const validPass = await bcrypt.compare(body.oldPassword, user.password);
    if (!validPass) return { message: 'Old password is wrong', success: false };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'Password changed.' };
    } catch (err) {
      return { message: err, success: false };
    }
  }
}

module.exports = ChangePassword;
