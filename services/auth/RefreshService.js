/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

const RefreshToken = require('../../models/RefreshToken');

const { generateToken } = require('../../utils/tokenGenerator');

class RefreshService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async Refresh(body) {
    const bodyIn = body;
    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken)
      return { success: false, error: 'refresh token bulunamadı' };

    const userId = jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = generateToken(
      userId,
      process.env.ACCESS_TOKEN_SECRET,
      '15d'
    );
    return { accessToken, success: true };
  }
}

module.exports = RefreshService;
