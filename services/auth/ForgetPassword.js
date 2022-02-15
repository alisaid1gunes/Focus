/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const ForgeteventEmitter = new EventEmitter();

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

class ForgetPassword {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ForgetPassword(body) {
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
      ForgeteventEmitter.emit(
        'forget-password',
        user.email,
        user.username,
        code
      );
      return {
        success: true,
        message: 'Verification code sent your email to change your password',
      };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { ForgetPassword, ForgeteventEmitter };
