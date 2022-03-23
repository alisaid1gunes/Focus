const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Login } = require('../../../../src/services/auth');

const { User, RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceUser = new MongooseService(User);

const MongooseServiceToken = new MongooseService(RefreshToken);

const LoginService = new Login(MongooseServiceUser, MongooseServiceToken);

const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const sinon = require('sinon');

const { generateToken } = require('../../../../src/utils/tokenGenerator');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../../../src/config/config');

describe('Login Service Unit Tests', () => {
  describe('LoginUser Functionality', () => {
    it('it should successfuly login if parameters are valid', async () => {
      const id = new mongoose.Types.ObjectId();
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('123456789', salt);

      const stubValue = {
        email: hoaxer.internet.email(),
        password: '123456789',
      };

      const expectedReturn = {
        accessToken: generateToken(id, ACCESS_TOKEN_SECRET, '15d'),
        refreshToken: generateToken(id, REFRESH_TOKEN_SECRET, '15d'),
        success: true,
        message: 'User logged in.',
      };

      const userReturn = {
        _id: id,
        username: hoaxer.internet.userName(),
        password,
        email: hoaxer.internet.email(),
        verification: {
          isVerified: true,
          code: 2561,
          expireDate: hoaxer.date.future(),
        },
        activation: {
          isActivated: true,
          code: 2561,
          expireDate: hoaxer.date.future(),
        },
        profileUrl: hoaxer.internet.avatar(),
      };
      const tokenReturn = {
        _id: id,
        token: generateToken(id, REFRESH_TOKEN_SECRET, '15d'),
        userId: id,
      };

      const userStub = sinon
        .stub(MongooseServiceUser, 'get')
        .returns(userReturn);

      const tokenStub = sinon
        .stub(MongooseServiceToken, 'save')
        .returns(tokenReturn);

      const result = await LoginService.LoginUser(stubValue);

      expect(userStub.calledOnce).to.be.true;
      expect(tokenStub.calledOnce).to.be.true;
      expect(result.accessToken).to.equal(expectedReturn.accessToken);
      expect(result.refreshToken).to.equal(expectedReturn.refreshToken);
      expect(result.success).to.equal(expectedReturn.success);
      expect(result.message).to.equal(expectedReturn.message);
    });
  });
});
