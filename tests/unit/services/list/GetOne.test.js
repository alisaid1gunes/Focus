const { expect } = require('chai');

const { GetOne } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(List);

const GetOneService = new GetOne(MongooseServiceInstance);

const mongoose = require('mongoose');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('GetOneService Unit Tests', () => {
  describe('GetOne Functionality', () => {
    it('it should successfuly return a relevant list if id is correct', async () => {
      const id = new mongoose.Types.ObjectId();

      const userId = new mongoose.Types.ObjectId();

      const taskId = new mongoose.Types.ObjectId();

      const returnValue = {
        _id: id,
        name: hoaxer.name.findName(),
        userId,
        tasks: [taskId],
      };

      const stub = sinon
        .stub(MongooseServiceInstance, 'get')
        .returns(returnValue);

      const result = await GetOneService.GetList(id);

      expect(stub.calledOnce).to.be.true;
      expect(result.success).to.equal(true);
      expect(result.message).to.equal('List found.');
      expect(result.result).to.equal(returnValue);
    });
  });
});
