/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const { activateValidation } = require('../../validations/auth');

class Activate {
  constructor(MongooseService) {
    this.mongooseUser = MongooseService;
  }

  async Activate(body) {
    const { error } = activateValidation(body);
    if (error) return { success: false, message: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.activation.expireDate);

    if (userExpireDate < Date.now())
      return { message: 'activation code is expired', success: false };

    if (user.activation.code === body.activationCode) {
      user.activation.isActivated = true;
      user.activation.code = null;

      try {
        await this.mongooseUser.update(user._id, user);
        return { success: true, message: 'User activated.' };
      } catch (err) {
        return { message: err, success: false };
      }
    } else {
      return { message: 'Activation code is invalid', success: false };
    }
  }
}

module.exports = Activate;
