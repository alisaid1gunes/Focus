const { expect } = require('chai');

const { Update } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(List);

const UpdateService = new Update(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('UpdateService Unit Tests', () => {
  describe('UpdateList Functionality', () => {
    const id = new mongoose.Types.ObjectId();

    const userId = new mongoose.Types.ObjectId();

    const taskId = new mongoose.Types.ObjectId();

    it('it should successfuly update a list if id is valid', async () => {
      const id = new mongoose.Types.ObjectId();

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

      const stub = sinon
        .stub(MongooseServiceInstance, 'update')
        .returns(returnValue);

      const result = await UpdateService.UpdateList(stubValue, id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('List updated.');
      
    });
  });
});
