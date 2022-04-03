const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { ForgetPasswordVerify } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { forgetPasswordVerify } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('forgetPasswordVerify controller', () => {
  const id = new mongoose.Types.ObjectId();
  let ForgetPasswordVerifyService, req, res, next;
  next = () => {};
  req = { body: { id, verificationCode: 2563 } };
  res = {
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    success: true,
    message: 'Password Verifyd',
  };

  ForgetPasswordVerifyService = new ForgetPasswordVerify(
    MongooseServiceInstance
  );

  it('should Verify change password that matches the id', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon
      .stub(ForgetPasswordVerifyService, 'ForgetPasswordVerify')
      .returns(returnValue);

    await forgetPasswordVerify(req, res, next, ForgetPasswordVerifyService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
