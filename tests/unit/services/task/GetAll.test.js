const { expect } = require('chai');

const { GetAll } = require('../../../../src/services/task');

const MongooseService = require('../../../../src/services/Mongoose');

const { Task } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(Task);

const GetAllService = new GetAll(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

const hoaxer = require('hoaxer');

describe('GetAllService Unit Tests', () => {
  describe('GetTask Functionality', () => {
    it('it should successfuly return relevant users tasks if user is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const userId = new mongoose.Types.ObjectId();

      const returnValue = [
        {
          _id: id,
          name: hoaxer.name.findName(),
          userId,
          done: true,
        },
      ];

      const stub = sinon
        .stub(MongooseServiceInstance, 'getAllWithQuery')
        .returns(returnValue);

      const result = await GetAllService.GetTask(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('Tasks found');
      expect(result.result).to.equal(returnValue);
    });
  });
});
