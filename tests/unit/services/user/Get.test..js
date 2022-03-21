const { expect } = require('chai');

const { Get } = require('../../../../src/services/user');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const GetService = new Get(MongooseServiceInstance);

const mongoose = require('mongoose');

describe('GetService Unit Tests', () => {
  describe('GetUser Functionality', () => {
    it('it should successfuly return a user if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const returnValue = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: hoaxer.internet.password(),
        email: hoaxer.internet.email(),
        verification: {
          isVerified: true,
          verificationCode: 'code',
          expireDate: hoaxer.date.future(),
        },
        activation: {
          isActivated: true,
          activationCode: 'code',
          expireDate: hoaxer.date.future(),
        },
      };

      const stub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const result = await GetService.GetUser(id);
      expect(stub.calledOnce).to.be.true;
      expect(result.result).to.equal(returnValue);
      expect(result.message).to.equal('User found.');
      expect(result.success).to.equal(true);
    });
  });
});
