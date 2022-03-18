const { expect } = require('chai');

const { Refresh } = require('../../../../src/services/auth');

const RefreshService = new Refresh();

const sinon = require('sinon');

describe('Refresh Service Unit Tests', () => {
  describe('Refresh Functionality', () => {
    it('it should successfuly refresh acces token if refresh token is valid ', async () => {
      const stubValue = {
        refreshToken: 'refreshToken',
      };

      const returnValue = {
        accessToken: 'accessToken',
        success: true,
        message: 'RefreshToken retrieved',
      };
      const stub = sinon.stub(RefreshService, 'Refresh').returns(returnValue);

      const result = await RefreshService.Refresh(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.accessToken).to.equal(returnValue.accessToken);
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
