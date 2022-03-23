const { expect } = require('chai');

const { Logout } = require('../../../../src/services/auth');

const { RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(RefreshToken);

const LogoutService = new Logout(MongooseServiceInstance);

const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const sinon = require('sinon');

const { generateToken } = require('../../../../src/utils/tokenGenerator');

const { REFRESH_TOKEN_SECRET } = require('../../../../src/config/config');

describe('Logout Service Unit Tests', () => {
  describe('LogoutUser Functionality', () => {
    it('it should successfuly logout if parameters are valid ', async () => {
      const id = new mongoose.Types.ObjectId();
      
      const stubValue = {
        refreshToken: generateToken(id, REFRESH_TOKEN_SECRET, '15d'),
      };

      const returnValue = {
        success: true,
        message: 'User logged out',
      };

      const stub = sinon.stub(MongooseServiceInstance, 'delete').returns(null);

      const result = await LogoutService.LogoutUser(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(returnValue.success);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
