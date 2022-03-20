const { expect } = require('chai');

const { GetAll } = require('../../../../src/services/list');

const GetAllService = new GetAll();

const sinon = require('sinon');

describe('GetAllService Unit Tests', () => {
  describe('GetList Functionality', () => {
    it('it should successfuly return relevant users list if user is correct', async () => {
      const stubValue = {
        id: 'id',
      };

      const returnValue = {
        result: 'result',
        success: true,
        message: 'List found.',
      };

      const stub = sinon.stub(GetAllService, 'GetList').returns(returnValue);

      const result = await GetAllService.GetList(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result).to.equal(returnValue.result);
    });
  });
});
