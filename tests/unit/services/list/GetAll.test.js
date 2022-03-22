const { expect } = require('chai');

const { GetAll } = require('../../../../src/services/list');

const MongooseService = require('../../../../src/services/Mongoose');

const { List } = require('../../../../src/models');

const MongooseServiceInstance = new MongooseService(List);

const GetAllService = new GetAll(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

const hoaxer = require('hoaxer');

describe('GetAllService Unit Tests', () => {
  describe('GetList Functionality', () => {
    it('it should successfuly return relevant users list if user is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const userId = new mongoose.Types.ObjectId();

      const taskId = new mongoose.Types.ObjectId();

      const returnValue = [
        {
          _id: id,
          name: hoaxer.name.findName(),
          tasks: [taskId, taskId],
        },
      ];

      const stub = sinon
        .stub(MongooseServiceInstance, 'getAllWithQuery')
        .returns(returnValue);

      const result = await GetAllService.GetList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('List found.');
      expect(result.result).to.equal(returnValue);
    });
  });
});
