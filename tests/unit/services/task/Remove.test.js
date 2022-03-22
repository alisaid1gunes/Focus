const { expect } = require('chai');

const { Remove } = require('../../../../src/services/task');

const hoaxer = require('hoaxer');

const MongooseService = require('../../../../src/services/Mongoose');

const { Task } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(Task);

const RemoveService = new Remove(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

describe('RemoveService Unit Tests', () => {
  describe('RemoveTask Functionality', () => {
    it('it should successfuly remove a relevant task if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const returnValue = {
        message: 'Task deleted',
        success: true,
      };

      const stub = sinon.stub(MongooseServiceInstance, 'delete').returns(null);

      const result = await RemoveService.RemoveTask(id);
      console.log(result);
      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal(returnValue.message);
    });
  });
});
