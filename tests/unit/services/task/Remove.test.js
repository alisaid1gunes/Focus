const { expect } = require('chai');

const { Remove } = require('../../../../src/services/task');

const hoaxer = require('hoaxer');

const RemoveService = new Remove();

const sinon = require('sinon');

describe('RemoveService Unit Tests', () => {
  describe('RemoveTask Functionality', () => {
    it('it should successfuly remove a relevant task if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        message: 'Task deleted.',
        success: true,
      };

      const stub = sinon.stub(RemoveService, 'RemoveTask').returns(returnValue);

      const result = await RemoveService.RemoveTask(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
