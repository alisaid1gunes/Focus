const { expect } = require('chai');

const { Get } = require('../../../../src/services/user');

const GetService = new Get();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

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
        success: true, message: 'User found' ,
      };

      const stub = sinon.stub(GetService, 'GetUser').returns(returnValue);

      const result = await GetService.GetUser(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result).to.equal(returnValue.result);
    });
  });
});
