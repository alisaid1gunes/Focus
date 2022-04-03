const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Login } = require('../../../../src/services/auth');

const { User, RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { login } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceUser = new MongooseService(User);

const MongooseServiceToken = new MongooseService(RefreshToken);

describe('Login controller', () => {
  const id = new mongoose.Types.ObjectId();
  let LoginService, req, res, next;
  const email = hoaxer.internet.email();
  const password = '123456789';
  const accessToken = 'accessToken';
  const refreshToken = 'refreshToken';
  const username = hoaxer.name.firstName();
  next = () => {};
  req = { body: { email, password } };
  res = {
    header: function () {},
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    username,
    accessToken,
    refreshToken,
    success: true,
    message: 'User logged in.',
  };

  LoginService = new Login(MongooseServiceUser, MongooseServiceToken);

  it('should login as a given user if email and password correct', async function () {
    const mock = sinon.mock(res);
    mock.expects('header').once().withExactArgs('auth-token', accessToken);

    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon.stub(LoginService, 'LoginUser').returns(returnValue);

    await login(req, res, next, LoginService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
