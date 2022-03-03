/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { activateValidation } = require('../../validations/auth');

class Activate {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async Activate(body) {
    const { error } = activateValidation(body);
    if (error) return { success: false, error: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.activation.expireDate);

    if (userExpireDate < Date.now())
      return { error: 'activation code is expired', success: false };

    if (user.activation.code === body.activationCode) {
      user.activation.isActivated = true;
      user.activation.code = null;

      try {
        await this.mongooseUser.update(user._id, user);
        return { success: true, message: 'activated' };
      } catch (err) {
        return { error: err, success: false };
      }
    } else {
      return { error: 'kod hatalı', success: false };
    }
  }
}

module.exports = Activate;
