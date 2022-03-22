const { expect } = require('chai');

const { Activate } = require('../../../../src/services/auth');

const MongooseService = require('../../../../src/services/Mongoose');

const { User } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(User);

const ActivateService = new Activate(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('Activate Service Unit Tests', () => {
  describe('Activate Functionality', () => {
    it('it should successfuly activate user if activation code is valid', async () => {
      const id = new mongoose.Types.ObjectId();
      const stubValue = {
        id,
        activationCode: 2561,
      };

      const returnValue = {
        _id: id,
        username: hoaxer.internet.userName(),
        password: hoaxer.internet.password(),
        email: hoaxer.internet.email(),
        verification: {
          isVerified: true,
          code: 2561,
          expireDate: hoaxer.date.future(),
        },
        activation: {
          isActivated: true,
          code: 2561,
          expireDate: hoaxer.date.future(),
        },
      };

      const getStub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const updateStub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(returnValue);

      const result = await ActivateService.Activate(stubValue);
    
      expect(getStub.calledOnce).to.be.true;
      expect(updateStub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('User activated.');
    });
  });
});
