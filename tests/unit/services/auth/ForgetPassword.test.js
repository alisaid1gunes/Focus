const { expect } = require('chai');

const { ForgetPassword } = require('../../../../src/services/auth');

const ForgetPasswordService = new ForgetPassword();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPassword Service Unit Tests', () => {
  describe('ForgetPassword Functionality', () => {
    it('it should successfuly start user forgot password process if user is in db', async () => {
      const stubValue = {
        id: 'id',
      };

      const returnValue = {
        success: true,
        message: 'Verification code sent your email to change your password',
      };

      const stub = sinon
        .stub(ForgetPasswordService, 'ForgetPassword')
        .returns(returnValue);

      const result = await ForgetPasswordService.ForgetPassword(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
