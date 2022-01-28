/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RefreshToken = require('../models/RefreshToken');

const MongooseService = require('./MongooseService');

const { generateToken } = require('../utils/tokenGenerator');

const {
  registerValidation,
  loginValidation,
} = require('../validations/validations');

class AuthService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async RegisterUser(body) {
    const bodyIn = body;
    const { error } = registerValidation(bodyIn);
    if (error) return error.details[0].message;

    const emailExist = await this.mongooseUser.get({ email: bodyIn.email });

    if (emailExist) return { error: 'email already exists', success: false };

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    const code = Math.floor(1000 + Math.random() * 9000);

    bodyIn.activationCode = code;

    try {
      const result = await this.mongooseUser.save(bodyIn);
      eventEmitter.emit('signup', bodyIn.email, bodyIn.username, code);
      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async LoginUser(body) {
    try {
      const { error } = loginValidation(body);

      if (error) return { error: error.details[0].message, success: false };

      const user = await this.mongooseUser.get({ email: body.email });

      if (!user) return { error: 'email or password is wrong', success: false };

      const validPass = await bcrypt.compare(body.password, user.password);

      if (!validPass) return { error: 'Invalid password', success: false };

      if (!user.isActive)
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

  async Refresh(body) {
    const bodyIn = body;
    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken)
      return { success: false, error: 'refresh token bulunamadı' };

    jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, userId) => {
        if (err) return { success: false, error: 'refresh token geçersiz' };
        const accessToken = generateToken(
          userId,
          process.env.ACCESS_TOKEN_SECRET,
          '15d'
        );

        return { accessToken, success: true };
      }
    );
  }

  async Activate(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    if (user.activationCode === body.activationCode) {
      user.isActive = true;
      user.activationCode = null;
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

  async ChangePassword(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const validPass = await bcrypt.compare(body.oldPassword, user.password);
    if (!validPass) return { error: 'old password is wrong', success: false };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }

  async ForgetPassword(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const code = Math.floor(1000 + Math.random() * 9000);

    user.verificationCode = code;

    try {
      await this.mongooseUser.update(user._id, user);
      eventEmitter.emit('forget-password', body.email, body.username, code);
      return {
        success: true,
        message: 'Verification code sent your email to change your password',
      };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
module.exports = { AuthService, eventEmitter };
