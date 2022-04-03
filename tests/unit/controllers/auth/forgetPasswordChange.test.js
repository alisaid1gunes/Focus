const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { ForgetPasswordChange } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { forgetPasswordChange } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('forgetPasswordChange controller', () => {
  const id = new mongoose.Types.ObjectId();
  let ForgetPasswordChangeService, req, res, next;
  next = () => {};
  req = { body: { id , newPassword: '123456789'} };
  res = {
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    success: true,
    message: 'Password changed',
  };

  ForgetPasswordChangeService = new ForgetPasswordChange(
    MongooseServiceInstance
  );

  it('should change password that matches the id', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon
      .stub(ForgetPasswordChangeService, 'ForgetPasswordChange')
      .returns(returnValue);

    await forgetPasswordChange(req, res, next, ForgetPasswordChangeService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
