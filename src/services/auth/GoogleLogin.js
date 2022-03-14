/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { generateToken } = require('../../utils/tokenGenerator');

const { RefreshToken } = require('../../models');

class GoogleLogin {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async Login(user) {
    if (!user.activation.isActivated)
      return { message: 'User could not be activated', success: false };

    const accessToken = generateToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      '15d'
    );
    const refreshToken = generateToken(
      user._id,
      process.env.REFRESH_TOKEN_SECRET,
      '15d'
    );

    const refreshTokenDb = new RefreshToken({
      token: refreshToken,
    });
    const savedToken = await this.mongooseRefreshToken.save(refreshTokenDb);

    return {
      accessToken,
      refreshToken: savedToken.token,
      success: true,
      message: 'User logged in',
    };
  }
}

module.exports = GoogleLogin;
