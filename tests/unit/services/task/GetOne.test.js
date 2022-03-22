const { expect } = require('chai');

const { GetOne } = require('../../../../src/services/task');

const MongooseService = require('../../../../src/services/Mongoose');

const { Task } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(Task);

const GetOneService = new GetOne(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('GetOneService Unit Tests', () => {
  describe('GetTask Functionality', () => {
    it('it should successfuly return a relevant task if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const userId = new mongoose.Types.ObjectId();

      const returnValue = {
        _id: id,
        name: hoaxer.name.findName(),
        userId,
        done: true,
      };

      const stub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const result = await GetOneService.GetTask(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Task found');
      expect(result.result).to.equal(returnValue);
    });
  });
});
