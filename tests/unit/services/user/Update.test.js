const { expect } = require('chai');

const { Update } = require('../../../../src/services/user');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const UpdateService = new Update(MongooseServiceInstance);

const mongoose = require('mongoose');

describe('UpdateService Unit Tests', () => {
  describe('UpdateUser Functionality', () => {
   it('it should successfuly update a user if id is valid', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: hoaxer.internet.password(),
        email: hoaxer.internet.email(),
        verification: {
          isVerified: true,
          code: 5555,
          expireDate: hoaxer.date.future(),
        },
        activation: {
          isActivated: true,
          code: 5555,
          expireDate: hoaxer.date.future(),
        },
        profileUrl: hoaxer.internet.avatar(),
      };

      const returnValue = {
        success: true,
        message: 'User updated',
      };

      const updateStub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(stubValue);

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(stubValue);

      const result = await UpdateService.UpdateUser(stubValue, id);

      expect(updateStub.calledOnce).to.be.true;
      expect(getStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
    expect(true).to.be.true;
  });
});
