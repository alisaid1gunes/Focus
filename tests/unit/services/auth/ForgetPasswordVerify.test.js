const { expect } = require('chai');

const { ForgetPasswordVerify } = require('../../../../src/services/auth');

const ForgetPasswordVerifyService = new ForgetPasswordVerify();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('ForgetPasswordVerifyService Unit Tests', () => {
  describe('ForgetPasswordVerify Functionality', () => {
    it('it should successfuly verify user change password after user forgot password if user is in db and verification code is correct', async () => {
      const stubValue = {
        id: 'id',
        verificationCode: 'verificationCode',
      };

      const returnValue = {
        success: true,
        message: 'Verified',
      };

      const stub = sinon
        .stub(ForgetPasswordVerifyService, 'ForgetPasswordVerify')
        .returns(returnValue);

      const result = await ForgetPasswordVerifyService.ForgetPasswordVerify(
        stubValue
      );

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
  