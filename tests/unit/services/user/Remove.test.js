const { expect } = require('chai');

const { Remove } = require('../../../../src/services/user');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const RemoveService = new Remove(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

const hoaxer = require('hoaxer');

describe('RemoveService Unit Tests', () => {
  describe('RemoveUser Functionality', () => {
    it('it should successfuly remove a relevant user if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const returnValue = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: hoaxer.internet.password(),
        email: hoaxer.internet.email(),
        verification: {
          isVerified: true,
          code: 3232,
          expireDate: hoaxer.date.future(),
        },
        activation: {
          isActivated: true,
          code: 3232,
          expireDate: hoaxer.date.future(),
        },
        profileUrl: hoaxer.internet.avatar(),
      };

      const deleteStub = sinon
        .stub(MongooseServiceInstance, 'delete')
        .returns(null);

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const result = await RemoveService.RemoveUser(id);

      expect(deleteStub.calledOnce).to.be.true;
      expect(getStub.calledOnce).to.be.true;

      expect(result.success).to.equal(true);
      expect(result.message).to.equal('User deleted');
      expect(true).to.be.true;
    });
  });
});
