const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { ForgetPassword } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { forgetPassword } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('forgetPassword controller', () => {
  const id = new mongoose.Types.ObjectId();
  let ForgetPasswordService, req, res, next;
  next = () => {};
  req = { body: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

  const returnValue = {
    success: true,
    message: 'Verification code sent your email to change your password',
  };

  ForgetPasswordService = new ForgetPassword(MongooseServiceInstance);

  it('should send verification code mail to user that matches the id', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(returnValue);

    const stub = sinon
      .stub(ForgetPasswordService, 'ForgetPassword')
      .returns(returnValue);

    await forgetPassword(req, res, next, ForgetPasswordService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
    expect(true).to.be.true;
  });
});
