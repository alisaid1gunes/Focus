const { expect } = require('chai');

const { ForgetPasswordChange } = require('../../../../src/services/auth');

const ForgetPasswordChangeService = new ForgetPasswordChange();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPasswordChangeService Unit Tests', () => {
  describe('ForgetPasswordChange Functionality', () => {
    it('it should successfuly change user password if user is in db and new password is valid', async () => {
      const stubValue = {
        id: 'id',
        newPassword: hoaxer.internet.password(),
      };

      const returnValue = {
        success: true,
        message: 'Password changed',
      };

      const stub = sinon
        .stub(ForgetPasswordChangeService, 'ForgetPasswordChange')
        .returns(returnValue);

      const result = await ForgetPasswordChangeService.ForgetPasswordChange(
        stubValue
      );

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
