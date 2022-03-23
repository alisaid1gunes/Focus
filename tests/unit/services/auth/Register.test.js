const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Register } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(User);

const RegisterService = new Register(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

const { generateToken } = require('../../../../src/utils/tokenGenerator');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../../../src/config/config');

describe('Register Service Unit Tests', () => {
  describe('RegisterUser Functionality', () => {
    it('it should successfuly add a new user if parameters are valid ', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        body: {
          email: hoaxer.internet.email(),
          password: '123456789',
          username: 'alisaid123',
        },
        file: {
          path: hoaxer.image.imageUrl(),
        },
      };

      const saveReturn = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: '123456789',
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
      const getStub = sinon.stub(MongooseServiceInstance, 'get').returns(null);

      const saveStub = sinon
        .stub(MongooseServiceInstance, 'save')
        .returns(saveReturn);

      const result = await RegisterService.RegisterUser(stubValue);
      console.log(result);
      expect(getStub.calledOnce).to.be.true;
      expect(saveStub.calledOnce).to.be.true;
      expect(result.user).to.equal(saveReturn);
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('User created');
    });
  });
});
