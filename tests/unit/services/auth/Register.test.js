const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Register } = require('../../../../src/services/auth/Register');

const RegisterService = new Register();

const sinon = require('sinon');

const { registerValidation } = require('../../../../src/validations/auth');

describe('Register Service Unit Tests', () => {
  describe('RegisterUser Functionality', () => {
    it('it should successfuly add a new user if parameters are valid ', async () => {
      const stubValue = {
        email: hoaxer.internet.email(),
        password: 'alisaid123',
        username: hoaxer.name.findName(),
      };

      const stub = sinon.stub(RegisterService, 'RegisterUser').returns({
        user: stubValue,
        username: stubValue.username,
        success: true,
        message: 'User created',
      });

      const result = await RegisterService.RegisterUser(stubValue);
      expect(stub.calledOnce).to.be.true;
      expect(result.user.email).to.equal(stubValue.email);
      expect(result.username).to.equal(stubValue.username);
    });
  });
});
