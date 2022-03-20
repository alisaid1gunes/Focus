const { expect } = require('chai');

const { GetOne } = require('../../../../src/services/task');

const GetOneService = new GetOne();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('GetOneService Unit Tests', () => {
  describe('GetTask Functionality', () => {
    it('it should successfuly return a relevant task if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        result: {
          _id: 'id',
          name: hoaxer.name.findName(),
          userId: 'id',
          done: true,
        },
        success: true,
        message: 'Task found.',
      };

      const stub = sinon.stub(GetOneService, 'GetTask').returns(returnValue);

      const result = await GetOneService.GetTask(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result).to.equal(returnValue.result);
    });
  });
});
