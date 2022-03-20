const { expect } = require('chai');

const { Remove } = require('../../../../src/services/list');

const hoaxer = require('hoaxer');

const RemoveService = new Remove();

const sinon = require('sinon');

describe('RemoveService Unit Tests', () => {
  describe('RemoveList Functionality', () => {
    it('it should successfuly remove a relevant list if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        message: 'List deleted.',
        success: true,
      };

      const stub = sinon.stub(RemoveService, 'RemoveList').returns(returnValue);

      const result = await RemoveService.RemoveList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
