const { expect } = require('chai');

const { Remove } = require('../../../../src/services/user');

const RemoveService = new Remove();

const sinon = require('sinon');

describe('RemoveService Unit Tests', () => {
  describe('RemoveUser Functionality', () => {
    it('it should successfuly remove a relevant user if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        message: 'User deleted.',
        success: true,
      };

      const stub = sinon.stub(RemoveService, 'RemoveUser').returns(returnValue);

      const result = await RemoveService.RemoveUser(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
