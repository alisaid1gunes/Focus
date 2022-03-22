const { expect } = require('chai');

const { Save } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(List);

const SaveService = new Save(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('SaveService Unit Tests', () => {
  describe('SaveList Functionality', () => {
    const id = new mongoose.Types.ObjectId();

    const userId = new mongoose.Types.ObjectId();

    const taskId = new mongoose.Types.ObjectId();
    it('it should successfuly save a list if it is valid', async () => {
      const stubValue = {
        name: hoaxer.name.findName(),
        userId,
        tasks: [taskId],
      };

      const returnValue = {
        _id: id,
        name: hoaxer.name.findName(),
        userId,
        tasks: [taskId],
      };

      const stub = sinon.stub(MongooseServiceInstance, 'save').returns(returnValue);

      const result = await SaveService.SaveList(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('List saved.');
    });
  });
});
