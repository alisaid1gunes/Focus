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

    if (emailExist) return 'email already exists';

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    const code = Math.floor(1000 + Math.random() * 9000);

    bodyIn.verificationCode = code;

    try {
      const result = await this.mongooseUser.save(bodyIn);
      eventEmitter.emit('signup', bodyIn.email, bodyIn.username, code);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async LoginUser(body) {
    const bodyIn = body;

    try {
      const { error } = loginValidation(bodyIn);

      if (error) return { error: error.details[0].message, success: false };

      const user = await this.mongooseUser.get({ email: bodyIn.email });
      console.log(user);
      if (!user) return { error: 'email or password is wrong', success: false };

      const validPass = await bcrypt.compare(bodyIn.password, user.password);

      if (!validPass) return { error: 'Invalid password', success: false };

      if (!user.isActive)
        return { error: 'User is not verified', success: false };

      // eslint-disable-next-line no-underscore-dangle
      const accessToken = generateToken(
        // eslint-disable-next-line no-underscore-dangle
        user._id,
        process.env.ACCESS_TOKEN_SECRET,
        '15d'
      );

      const refreshToken = generateToken(
        // eslint-disable-next-line no-underscore-dangle
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

      return 'user logged out';
    } catch (err) {
      return `logout error occurred${err}`;
    }
  }

  // eslint-disable-next-line consistent-return
  async Refresh(body) {
    const bodyIn = body;
    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken) return 'refresh token bulunamadı';

    jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, userId) => {
        if (err) return 'refresh token geçersiz';
        const accessToken = generateToken(
          userId,
          process.env.ACCESS_TOKEN_SECRET,
          '15d'
        );

        return accessToken;
      }
    );
  }

  async Activate(body) {
    // eslint-disable-next-line no-underscore-dangle
    const user = await this.mongooseUser.get({ _id: body.id });
    console.log(user);
    if (user.verificationCode === body.verificationCode) {
      user.isActive = true;
      user.verificationCode = null;
      try {
        // eslint-disable-next-line no-underscore-dangle
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
    // eslint-disable-next-line no-underscore-dangle
    const user = await this.mongooseUser.get({ _id: body.id });
    console.log(user);
    const validPass = await bcrypt.compare(body.oldPassword, user.password);
    if (!validPass) return { error: 'old password is wrong', success: false };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    try {
      // eslint-disable-next-line no-underscore-dangle
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}

module.exports = { AuthService, eventEmitter };
