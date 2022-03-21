/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const { forgetPasswordChangeValidation } = require('../../validations/auth');

class ForgetPasswordChange {
  constructor(MongooseService) {
    this.mongooseUser = MongooseService;
  }

  async ForgetPasswordChange(body) {
    const { error } = forgetPasswordChangeValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);
    user.verification.isVerified = false;

    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'Password changed' };
    } catch (err) {
      return {
        success: false,
        message: `Password could not be changed. Error: ${err}`,
      };
    }
  }
}

module.exports = ForgetPasswordChange;
