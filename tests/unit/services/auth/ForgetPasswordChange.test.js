const { expect } = require('chai');

const { ForgetPasswordChange } = require('../../../../src/services/auth');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const ForgetPasswordChangeService = new ForgetPasswordChange(
  MongooseServiceInstance
);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPasswordChangeService Unit Tests', () => {
  describe('ForgetPasswordChange Functionality', () => {
    it('it should successfuly change user password if user is in db and new password is valid', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        id,
        newPassword: '123456789',
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

      const result = await ForgetPasswordChangeService.ForgetPasswordChange(
        stubValue
      );

      expect(getStub.calledOnce).to.be.true;
      expect(updateStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Password changed');
    });
  });
});
