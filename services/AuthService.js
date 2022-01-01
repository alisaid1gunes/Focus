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

    try {
      const result = await this.mongooseUser.save(bodyIn);

      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async LoginUser(body) {
    const bodyIn = body;

    try {
      const { error } = loginValidation(bodyIn);

      if (error) return error.details[0].message;

      const user = await this.mongooseUser.get({ email: bodyIn.email });

      if (!user) return 'email or password is wrong';

      const validPass = await bcrypt.compare(bodyIn.password, user.password);

      if (!validPass) return 'Invalid password';

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

      return { accessToken, refreshToken: savedToken.token };
    } catch (err) {
      return err;
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
        if (err) return console.log(err);
        const accessToken = generateToken(
          userId,
          process.env.ACCESS_TOKEN_SECRET,
          '15d'
        );

        return accessToken;
      }
    );
  }
}

module.exports = AuthService;
