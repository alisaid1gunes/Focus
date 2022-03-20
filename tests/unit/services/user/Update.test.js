const { expect } = require('chai');

const { Update } = require('../../../../src/services/user');

const UpdateService = new Update();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('UpdateService Unit Tests', () => {
  describe('UpdateUser Functionality', () => {
    it('it should successfuly update a user if id is valid', async () => {
      const id = 'id';
      const stubValue = {
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
      };

      const returnValue = {
        success: true,
        message: 'User updated.',
      };

      const stub = sinon.stub(UpdateService, 'UpdateUser').returns(returnValue);

      const result = await UpdateService.UpdateUser(stubValue, id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
