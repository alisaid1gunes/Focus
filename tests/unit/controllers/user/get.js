const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Get } = require('../../../../src/services/user');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const MongooseServiceInstance = new MongooseService(User);

const GetService = new Get(MongooseServiceInstance);

const mongoose = require('mongoose');

const sinon = require('sinon');

describe('User get controller', () => {
  it('should return a user with id', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        id,
      },
    };
    const returnValue = {
      _id: id,
      username: hoaxer.internet.userName(),
      password: hoaxer.internet.password(),
      email: hoaxer.internet.email(),
      verification: {
        isVerified: false,
        code: hoaxer.random.number(),
        expireDate: hoaxer.date.future(),
      },
      activation: {
        isActivated: false,
        code: hoaxer.random.number(),
        expireDate: hoaxer.date.future(),
      },
      profileUrl: hoaxer.internet.avatar(),
    };

    const stub = sinon
      .stub(MongooseServiceInstance, 'get')
      .returns(returnValue);

  
  });
});
