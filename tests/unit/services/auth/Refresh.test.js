const { expect } = require('chai');

const { Refresh } = require('../../../../src/services/auth');

const { RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(RefreshToken);

const RefreshService = new Refresh(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

const { generateToken } = require('../../../../src/utils/tokenGenerator');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../../../../src/config/config');

describe('Refresh Service Unit Tests', () => {
  describe('Refresh Functionality', () => {
    it('it should successfuly refresh token if refresh token is valid ', async () => {
      const id = new mongoose.Types.ObjectId();
      
      const stubValue = {
        refreshToken: generateToken(id, REFRESH_TOKEN_SECRET, '15d'),
      };

      const expectedReturn = {
        accessToken: generateToken(id, ACCESS_TOKEN_SECRET, '15d'),
        success: true,
        message: 'RefreshToken retrieved',
      };

      const tokenReturn = {
        _id: id,
        token: generateToken(id, REFRESH_TOKEN_SECRET, '15d'),
        userId: id,
      };

      const stub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(tokenReturn);

      const result = await RefreshService.Refresh(stubValue);
    
      expect(stub.calledOnce).to.be.true;
      expect(result.accessToken).to.equal(expectedReturn.accessToken);
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(expectedReturn.message);
    });
  });
});
