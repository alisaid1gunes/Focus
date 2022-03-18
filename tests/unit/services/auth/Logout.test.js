const { expect } = require('chai');

const { Logout } = require('../../../../src/services/auth');

const LogoutService = new Logout();

const sinon = require('sinon');

describe('Logout Service Unit Tests', () => {
  describe('LogoutUser Functionality', () => {
    it('it should successfuly logout if parameters are valid ', async () => {
      const stubValue = {
        refreshToken: 'refreshToken',
      };

      const returnValue = {
        success: true,
        message: 'User logged out',
      };

      const stub = sinon.stub(LogoutService, 'LogoutUser').returns(returnValue);

      const result = await LogoutService.LogoutUser(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(returnValue.success);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
