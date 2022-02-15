/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

class ChangePasswordService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ChangePassword(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const validPass = await bcrypt.compare(body.oldPassword, user.password);
    if (!validPass) return { error: 'old password is wrong', success: false };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}

module.exports = ChangePasswordService;
