/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');

const { generateToken } = require('../../utils/tokenGenerator');

const { refreshValidation } = require('../../validations/auth');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../config/config');

class Refresh {
  constructor(MongooseRefresh) {
    this.mongooseRefreshToken = MongooseRefresh;
  }

  async Refresh(body) {
    const bodyIn = body;

    const { error } = refreshValidation(bodyIn);
    if (error) return { success: false, message: error.details[0].message };

    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken)
      return { success: false, message: 'RefreshToken could not be retrieved' };

    const userId = jwt.verify(refreshToken.token, REFRESH_TOKEN_SECRET);

    const accessToken = generateToken(userId._id, ACCESS_TOKEN_SECRET, '15d');

    return { accessToken, success: true, message: 'RefreshToken retrieved' };
  }
}

module.exports = Refresh;
