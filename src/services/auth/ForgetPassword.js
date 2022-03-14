/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const forgetEmitter = new EventEmitter();

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { forgetPasswordValidation } = require('../../validations/auth');

class ForgetPassword {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ForgetPassword(body) {
    const { error } = forgetPasswordValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    const code = Math.floor(1000 + Math.random() * 9000);

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    user.verification = {
      isVerified: false,
      code,
      expireDate,
    };

    try {
      await this.mongooseUser.update(user._id, user);
      forgetEmitter.emit('forget-password', user.email, user.username, code);
      return {
        success: true,
        message: 'Verification code sent your email to change your password',
      };
    } catch (err) {
      return { success: false, message: err };
    }
  }
}

module.exports = { ForgetPassword, forgetEmitter };
