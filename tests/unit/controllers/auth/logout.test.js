const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Logout } = require('../../../../src/services/auth');

const { RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { logout } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceToken = new MongooseService(RefreshToken);

describe('Logout controller', () => {
  let LogoutService, req, res, next;
  const refreshToken = 'refreshToken';

  next = () => {};
  req = { body: { refreshToken } };
  res = {
    header: function () {},
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    success: true,
    message: 'User logged out',
  };

  LogoutService = new Logout(MongooseServiceToken);

  it('should Logout as a given refreshToken owner', async function () {
    const mock = sinon.mock(res);

    mock.expects('header').once().withExactArgs('auth-token', '');

    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon.stub(LogoutService, 'LogoutUser').returns(returnValue);

    await logout(req, res, next, LogoutService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
