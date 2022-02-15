/* eslint-disable no-underscore-dangle */

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

const RefreshToken = require('../../models/RefreshToken');

class LogoutService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async LogoutUser(body) {
    const bodyIn = body;

    const { refreshToken } = bodyIn;

    try {
      await this.mongooseRefreshToken.delete({ token: refreshToken });

      return { success: true, message: 'user logged out' };
    } catch (err) {
      return { success: false, error: `logout error occurred${err}` };
    }
  }
}

module.exports = LogoutService;
