const { expect } = require('chai');

const { GetAll } = require('../../../../src/services/list');

const GetAllService = new GetAll();

const sinon = require('sinon');

const hoaxer = require('hoaxer');

describe('GetAllService Unit Tests', () => {
  describe('GetList Functionality', () => {
    it('it should successfuly return relevant users list if user is correct', async () => {
      const id = 'id';

      const returnValue = {
        result: [{
          _id:  'id',
          name: hoaxer.name.findName(),
          userId:  'id',
          tasks: [ 'id'],
        }],
        success: true,
        message: 'List found.',
      };

      const stub = sinon.stub(GetAllService, 'GetList').returns(returnValue);

      const result = await GetAllService.GetList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
      expect(result.result[0]).to.equal(returnValue.result[0]);
    });
  });
});
