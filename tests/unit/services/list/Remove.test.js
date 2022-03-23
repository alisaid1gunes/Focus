const { expect } = require('chai');

const { Remove } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(List);

const RemoveService = new Remove(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

describe('RemoveService Unit Tests', () => {
  describe('RemoveList Functionality', () => {
    it('it should successfuly remove a relevant list if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const returnValue = {
        message: 'List deleted.',
        success: true,
      };

      const stub = sinon.stub(MongooseServiceInstance, 'delete').returns(null);

      const result = await RemoveService.RemoveList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
