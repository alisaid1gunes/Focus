const { expect } = require('chai');

const { ForgetPassword } = require('../../../../src/services/auth');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const ForgetPasswordService = new ForgetPassword(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPassword Service Unit Tests', () => {
  describe('ForgetPassword Functionality', () => {
    it('it should successfuly start user forgot password process if user is in db', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        id,
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
      };

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const updateStub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(returnValue);

      const result = await ForgetPasswordService.ForgetPassword(stubValue);

      expect(getStub.calledOnce).to.be.true;
      expect(updateStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(
        'Verification code sent your email to change your password'
      );
    });
  });
});
