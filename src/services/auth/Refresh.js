/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { RefreshToken } = require('../../models');

const { generateToken } = require('../../utils/tokenGenerator');

const { refreshValidation } = require('../../validations/auth');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../config/config');

class Refresh {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async Refresh(body) {
    const bodyIn = body;

    const { error } = refreshValidation(bodyIn);
    if (error) return { success: false, error: error.details[0].message };

    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken)
      return { success: false, error: 'refresh token bulunamadı' };

    const userId = jwt.verify(refreshToken.token, REFRESH_TOKEN_SECRET);

    const accessToken = generateToken(userId, ACCESS_TOKEN_SECRET, '15d');
    return { accessToken, success: true };
  }
}

module.exports = Refresh;
