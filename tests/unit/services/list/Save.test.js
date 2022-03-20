const { expect } = require('chai');

const { Save } = require('../../../../src/services/list');

const SaveService = new Save();

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('SaveService Unit Tests', () => {
  describe('SaveList Functionality', () => {
    it('it should successfuly save a list if it is valid', async () => {
      const stubValue = {
        name: hoaxer.name.findName(),
        userId:  'id',
        tasks: [ 'id'],
      };

      const returnValue = {
        success: true,
        message: 'List saved.',
      };

      const stub = sinon.stub(SaveService, 'SaveList').returns(returnValue);

      const result = await SaveService.SaveList(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
