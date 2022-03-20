const { expect } = require('chai');

const { GetAll } = require('../../../../src/services/task');

const GetAllService = new GetAll();

const sinon = require('sinon');

const hoaxer = require('hoaxer');

describe('GetAllService Unit Tests', () => {
  describe('GetTask Functionality', () => {
    it('it should successfuly return relevant users tasks if user is correct', async () => {
      const id = 'id';

      const returnValue = {
        result: [
          {
            _id: 'id',
            name: hoaxer.name.findName(),
            userId: 'id',
            done: true,
          },
        ],
        success: true,
        message: 'Tasks found.',
      };

      const stub = sinon.stub(GetAllService, 'GetTask').returns(returnValue);

      const result = await GetAllService.GetTask(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result[0]).to.equal(returnValue.result[0]);
    });
  });
});
