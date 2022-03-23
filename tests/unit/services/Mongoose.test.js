const { expect } = require('chai');

const MongooseService = require('../../../src/services/Mongoose');

const TestModel = require('./TestModel');

const hoaxer = require('hoaxer');

const sinon = require('sinon');

describe('MongooseService Unit Tests', () => {
  describe('save Functionality', () => {
    it('it should successfuly save a model', async () => {
      const returnValue = {
        _id: 'id',
        name: hoaxer.internet.userName(),
      };

      const stub = sinon.stub(TestModel, 'create').returns(returnValue);

      const result = await new MongooseService(TestModel).save(
        returnValue.name
      );
      
      expect(stub.calledOnce).to.be.true;
      expect(result._id).to.equal(returnValue._id);
      expect(result.name).to.equal(returnValue.name);
    });
  });
});
