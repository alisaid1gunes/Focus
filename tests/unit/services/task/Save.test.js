const { expect } = require('chai');

const { Save } = require('../../../../src/services/task');

const MongooseService = require('../../../../src/services/Mongoose');

const { Task } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(Task);

const SaveService = new Save(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('SaveService Unit Tests', () => {
  describe('SaveTask Functionality', () => {
    it('it should successfuly save a task if it is valid', async () => {
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

      const stub = sinon
        .stub(MongooseServiceInstance, 'save')
        .returns(returnValue);

      const result = await SaveService.SaveTask(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Task saved.');
    });
  });
});
