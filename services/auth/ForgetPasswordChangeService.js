/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

class ForgetPasswordChangeService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ForgetPasswordChange(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);
    user.verification.isVerified = false;
    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}

module.exports = ForgetPasswordChangeService;
