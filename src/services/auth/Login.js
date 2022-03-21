/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const { loginValidation } = require('../../validations/auth');

const { generateToken } = require('../../utils/tokenGenerator');

const { RefreshToken } = require('../../models');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../config/config');

class Login {
  constructor(MongooseUser, MongooseRefresh) {
    this.mongooseUser = MongooseUser;
    this.mongooseRefreshToken = MongooseRefresh;
  }

  async LoginUser(body) {
    try {
      const { error } = loginValidation(body);

      if (error) return { message: error.details[0].message, success: false };

      const user = await this.mongooseUser.get({ email: body.email });

      if (!user)
        return { message: 'Email or password is wrong', success: false };

      const validPass = await bcrypt.compare(body.password, user.password);

      if (!validPass) return { message: 'Invalid password', success: false };

      if (!user.activation.isActivated)
        return { message: 'User could not be activated', success: false };

      const accessToken = generateToken(user._id, ACCESS_TOKEN_SECRET, '15d');

      const refreshToken = generateToken(user._id, REFRESH_TOKEN_SECRET, '15d');

      const refreshTokenDb = new RefreshToken({
        token: refreshToken,
      });
      const savedToken = await this.mongooseRefreshToken.save(refreshTokenDb);

      return {
        accessToken,
        refreshToken: savedToken.token,
        success: true,
        message: 'User logged in.',
      };
    } catch (err) {
      return { message: err, success: false };
    }
  }
}

module.exports = Login;
