/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const MongooseService = require('../Mongoose');

const { loginValidation } = require('../../validations/validations');

const { generateToken } = require('../../utils/tokenGenerator');

const RefreshToken = require('../../models/RefreshToken');

class Login {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async LoginUser(body) {
    try {
      const { error } = loginValidation(body);

      if (error) return { error: error.details[0].message, success: false };

      const user = await this.mongooseUser.get({ email: body.email });

      if (!user) return { error: 'email or password is wrong', success: false };

      const validPass = await bcrypt.compare(body.password, user.password);

      if (!validPass) return { error: 'Invalid password', success: false };

      if (!user.activation.isActivated)
        return { error: 'User is not activated', success: false };

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

      return { accessToken, refreshToken: savedToken.token, success: true };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}

module.exports = Login;
