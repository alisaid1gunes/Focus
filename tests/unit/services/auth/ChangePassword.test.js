const { expect } = require('chai');

const { ChangePassword } = require('../../../../src/services/auth');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const ChangePasswordService = new ChangePassword(MongooseServiceInstance);

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ChangePassword Service Unit Tests', () => {
  describe('ChangePassword Functionality', () => {
    it('it should successfuly change user password if old password is correct', async () => {
      const id = new mongoose.Types.ObjectId();
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('123456789', salt);

      const stubValue = {
        id,
        oldPassword: '123456789',
        newPassword: '123456789',
      };

      const returnValue = {
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

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const updateStub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(returnValue);

      const result = await ChangePasswordService.ChangePassword(stubValue);

      expect(getStub.calledOnce).to.be.true;
      expect(updateStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Password changed.');
    });
  });
});
