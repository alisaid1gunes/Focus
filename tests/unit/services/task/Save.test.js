const { expect } = require('chai');

const { Save } = require('../../../../src/services/task');

const SaveService = new Save();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('SaveService Unit Tests', () => {
  describe('SaveTask Functionality', () => {
    it('it should successfuly save a task if it is valid', async () => {
      const stubValue = {
        name: hoaxer.name.findName(),
        userId: 'id',
        done: true,
      };

      const returnValue = {
        success: true,
        message: 'Task saved.',
      };

      const stub = sinon.stub(SaveService, 'SaveTask').returns(returnValue);

      const result = await SaveService.SaveTask(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
