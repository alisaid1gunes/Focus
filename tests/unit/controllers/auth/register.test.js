const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Register } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { register } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceUser = new MongooseService(User);

describe('Register controller', () => {
  const id = new mongoose.Types.ObjectId();
  let RegisterService, req, res, next;
  const user = {
    _id: id,
    username: hoaxer.internet.userName(),
    password: hoaxer.internet.password(),
    email: hoaxer.internet.email(),
    verification: {
      isVerified: true,
      code: 5151,
      expireDate: hoaxer.date.future(),
    },
    activation: {
      isActivated: true,
      code: 6161,
      expireDate: hoaxer.date.future(),
    },
    profileUrl: hoaxer.internet.avatar(),
  };

  next = () => {};
  req = { body: { user } };
  res = {
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    success: true,
    user,
    message: 'User created',
  };

  RegisterService = new Register(MongooseServiceUser);

  it('should register given user', async function () {
   const mock = sinon.mock(res);

    mock.expects('status').once().withExactArgs(201);
    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon
      .stub(RegisterService, 'RegisterUser')
      .returns(returnValue);

    await register(req, res, next, RegisterService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
