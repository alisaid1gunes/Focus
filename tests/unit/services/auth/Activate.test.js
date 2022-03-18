const { expect } = require('chai');

const { Activate } = require('../../../../src/services/auth');

const ActivateService = new Activate();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('Activate Service Unit Tests', () => {
  describe('Activate Functionality', () => {
    it('it should successfuly activate user if activation code is valid', async () => {
      const stubValue = {
        id: 'id',
        activationCode: hoaxer.internet.password(),
      };

      const returnValue = { success: true, message: 'User activated.' };

      const stub = sinon.stub(ActivateService, 'Activate').returns(returnValue);

      const result = await ActivateService.Activate(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
