/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const { RefreshToken } = require('../../models');

const { logoutValidation } = require('../../validations/auth');

class Logout {
  constructor(MongooseUser, MongooseRefresh) {
    this.mongooseUser = MongooseUser;
    this.mongooseRefreshToken = MongooseRefresh;
  }

  async LogoutUser(body) {
    const bodyIn = body;

    const { error } = logoutValidation(bodyIn);
    if (error) return { success: false, message: error.details[0].message };

    const { refreshToken } = bodyIn;

    try {
      await this.mongooseRefreshToken.delete({ token: refreshToken });

      return { success: true, message: 'User logged out' };
    } catch (err) {
      return {
        success: false,
        message: `User could not be logged out Error:${err}`,
      };
    }
  }
}

module.exports = Logout;
