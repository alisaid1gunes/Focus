const { expect } = require('chai');

const { GetOne } = require('../../../../src/services/list');

const GetOneService = new GetOne();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('GetOneService Unit Tests', () => {
  describe('GetOne Functionality', () => {
    it('it should successfuly return a relevant list if id is correct', async () => {
      const id = 'id';

      const returnValue = {
        result: {
          _id: 'id',
          name: hoaxer.name.findName(),
          userId: 'id',
          tasks: ['id'],
        },
        success: true,
        message: 'List found.',
      };

      const stub = sinon.stub(GetOneService, 'GetList').returns(returnValue);

      const result = await GetOneService.GetList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result).to.equal(returnValue.result);
    });
  });
});
