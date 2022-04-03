const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Refresh } = require('../../../../src/services/auth');

const { RefreshToken } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { refresh } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceToken = new MongooseService(RefreshToken);

describe('Refresh controller', () => {
  let RefreshService, req, res, next;
  const refreshToken = 'refreshToken';
  const accessToken = 'accessToken';

  next = () => {};
  req = { body: { refreshToken } };
  res = {
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    accessToken,
    success: true,
    message: 'RefreshToken retrieved',
  };

  RefreshService = new Refresh(MongooseServiceToken);

  it('should Refresh the accesToken as a given refreshToken owner', async function () {
    const mock = sinon.mock(res);

    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon.stub(RefreshService, 'Refresh').returns(returnValue);

    await refresh(req, res, next, RefreshService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
