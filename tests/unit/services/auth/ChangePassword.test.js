const { expect } = require('chai');

const { ChangePassword } = require('../../../../src/services/auth');

const ChangePasswordService = new ChangePassword();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ChangePassword Service Unit Tests', () => {
  describe('ChangePassword Functionality', () => {
    it('it should successfuly change user password if old password is correct', async () => {
      const stubValue = {
        id: 'id',
        oldPassword: hoaxer.internet.password(),
        newPassword: hoaxer.internet.password(),
      };

      const returnValue = { success: true, message: 'Password changed.' };

      const stub = sinon
        .stub(ChangePasswordService, 'ChangePassword')
        .returns(returnValue);

      const result = await ChangePasswordService.ChangePassword(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
