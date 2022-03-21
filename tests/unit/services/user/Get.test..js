const { expect } = require('chai');

const { Get } = require('../../../src/services/user');

const { User } = require('../../../src/models');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

const MongooseService = require('../../../src/services/Mongoose');

const GetService = new Get(MongooseService);

describe('GetService Unit Tests', () => {
  describe('GetUser Functionality', () => {
    it('it should successfuly return a user if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        result: {
          _id: 'id',
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
          profileUrl: hoaxer.internet.avatar(),
        },
        success: true,
        message: 'User found',
      };

      const stub = sinon.stub(MongooseService, 'get').returns(returnValue);

      const result = await GetService.GetUser(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result).to.equal(returnValue.result);
    });
  });
});
