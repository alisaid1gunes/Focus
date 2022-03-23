const { expect } = require('chai');

const { ForgetPasswordVerify } = require('../../../../src/services/auth');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const ForgetPasswordVerifyService = new ForgetPasswordVerify(
  MongooseServiceInstance
);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPasswordVerifyService Unit Tests', () => {
  describe('ForgetPasswordVerify Functionality', () => {
    it('it should successfuly verify user change password after user forgot password if user is in db and verification code is correct', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        id,
        verificationCode: 2561,
      };

      const returnValue = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: hoaxer.internet.password(),
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

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const updateStub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(returnValue);

      const result = await ForgetPasswordVerifyService.ForgetPasswordVerify(
        stubValue
      );

      expect(getStub.calledOnce).to.be.true;
      expect(updateStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Verified');
    });
  });
});
