const { expect } = require('chai');

const { Update } = require('../../../../src/services/list');

const UpdateService = new Update();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('UpdateService Unit Tests', () => {
  describe('UpdateList Functionality', () => {
    it('it should successfuly update a list if id is valid', async () => {
      const id = 'id';
      const stubValue = {
        name: hoaxer.name.findName(),
        userId: 'id',
        tasks: ['id'],
      };

      const returnValue = {
        success: true,
        message: 'List updated.',
      };

      const stub = sinon.stub(UpdateService, 'UpdateList').returns(returnValue);

      const result = await UpdateService.UpdateList(stubValue, id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
