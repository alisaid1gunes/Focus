/* eslint-disable no-underscore-dangle */

const User = require('../../models/User');

const MongooseService = require('../Mongoose');

class ForgetPasswordVerify {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ForgetPasswordVerify(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.verification.expireDate);

    if (userExpireDate < Date.now())
      return { error: 'verification code is expired', success: false };

    if (user.verification.code === body.verificationCode) {
      user.verification.isVerified = true;
      user.verification.code = null;

      try {
        await this.mongooseUser.update(user._id, user);
        return { success: true, message: 'verified' };
      } catch (err) {
        return { error: err, success: false };
      }
    } else {
      return { error: 'verification code is wrong', success: false };
    }
  }
}

module.exports = ForgetPasswordVerify;
