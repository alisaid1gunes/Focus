const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Login } = require('../../../../src/services/auth');

const LoginService = new Login();

const sinon = require('sinon');

describe('Login Service Unit Tests', () => {
  describe('LoginUser Functionality', () => {
    it('it should successfuly login if parameters are valid ', async () => {
      const stubValue = {
        email: hoaxer.internet.email(),
        password: hoaxer.internet.password(),
      };

      const returnValue = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        success: true,
        message: 'User logged in.',
      };

      const stub = sinon.stub(LoginService, 'LoginUser').returns(returnValue);

      
      const result = await LoginService.LoginUser(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(result.accessToken).to.equal(returnValue.accessToken);
      expect(result.refreshToken).to.equal(returnValue.refreshToken);
      expect(result.success).to.equal(returnValue.success);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
