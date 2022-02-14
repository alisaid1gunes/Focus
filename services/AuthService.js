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
    if (error) return { error: error.details[0].message, success: false };

    const emailExist = await this.mongooseUser.get({ email: bodyIn.email });

    if (emailExist) return { error: 'email already exists', success: false };

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    const code = Math.floor(1000 + Math.random() * 9000);

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    bodyIn.activation = {
      isActived: false,
      code,
      expireDate,
    };

    try {
      const user = await this.mongooseUser.save(bodyIn);

      eventEmitter.emit('signup', bodyIn.email, bodyIn.username, code);
      return { success: true, user };
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

  async Activate(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.activation.expireDate);

    if (userExpireDate < Date.now())
      return { error: 'activation code is expired', success: false };

    if (user.activation.code === body.activationCode) {
      user.activation.isActivated = true;
      user.activation.code = null;
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

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    user.verification = {
      isVerified: false,
      code,
      expireDate,
    };

    try {
      await this.mongooseUser.update(user._id, user);
      eventEmitter.emit('forget-password', user.email, user.username, code);
      return {
        success: true,
        message: 'Verification code sent your email to change your password',
      };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async ForgetPasswordVerify(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const userExpireDate = new Date(user.verification.expireDate);

    if (userExpireDate < Date.now())
      return { error: 'verification code is expired', success: false };

    if (user.verification.code === body.verificationCode) {
      user.verification.isVerified = true;
      user.verification.code = null;

      try {
        await this.mongooseUser.update(user._id, user);
        return { success: true, message: 'verified' };
      } catch (err) {
        return { error: err, success: false };
      }
    } else {
      return { error: 'verification code is wrong', success: false };
    }
  }

  async ForgetPasswordChange(body) {
    const user = await this.mongooseUser.get({ _id: body.id });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);
    user.verification.isVerified = false;
    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}
module.exports = { AuthService, eventEmitter };
