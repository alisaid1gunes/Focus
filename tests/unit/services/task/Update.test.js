const { expect } = require('chai');

const { Update } = require('../../../../src/services/task');

const MongooseService = require('../../../../src/services/Mongoose');

const { Task } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(Task);

const UpdateService = new Update(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('UpdateService Unit Tests', () => {
  describe('UpdateTask Functionality', () => {
    it('it should successfuly update a task if id is valid', async () => {
      const id = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
      const stubValue = {
        name: hoaxer.name.findName(),
        userId,
        done: true,
      };

      const returnValue = {
        _id: id,
        name: hoaxer.name.findName(),
        userId,
        done: true,
      };

      const stub = sinon.stub(MongooseServiceInstance, 'update').returns(returnValue);

      const result = await UpdateService.UpdateTask(stubValue, id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Task updated.');
     
    });
  });
});
