const { expect } = require('chai');

const { Update } = require('../../../../src/services/task');

const UpdateService = new Update();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('UpdateService Unit Tests', () => {
  describe('UpdateTask Functionality', () => {
    it('it should successfuly update a task if id is valid', async () => {
      const id = 'id';
      const stubValue = {
        name: hoaxer.name.findName(),
        userId: 'id',
        done: true,
      };

      const returnValue = {
        success: true,
        message: 'Task updated.',
      };

      const stub = sinon.stub(UpdateService, 'UpdateTask').returns(returnValue);

      const result = await UpdateService.UpdateTask(stubValue, id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
