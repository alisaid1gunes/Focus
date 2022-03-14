/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { forgetPasswordVerifyValidation } = require('../../validations/auth');

class ForgetPasswordVerify {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ForgetPasswordVerify(body) {
    const { error } = forgetPasswordVerifyValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.verification.expireDate);

    if (userExpireDate < Date.now())
      return { message: 'Verification code is expired', success: false };

    if (user.verification.code === body.verificationCode) {
      user.verification.isVerified = true;
      user.verification.code = null;

      try {
        await this.mongooseUser.update(user._id, user);
        return { success: true, message: 'Verified' };
      } catch (err) {
        return { message: err, success: false };
      }
    } else {
      return { message: 'Verification code is wrong', success: false };
    }
  }
}

module.exports = ForgetPasswordVerify;
