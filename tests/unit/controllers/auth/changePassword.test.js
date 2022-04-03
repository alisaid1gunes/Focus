const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { ChangePassword } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { changePassword } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('List activate controller', () => {
  const id = new mongoose.Types.ObjectId();
  let ChangePasswordService, req, res, next;
  next = () => {};
  req = { body: { id, newPassword: '123456789', oldPassword: '123456789' } };
  res = {
    json: function () {},
    status: function () {},
  };

  ChangePasswordService = new ChangePassword(MongooseServiceInstance);

  it('should activate a user', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      success: true,
      message: 'Password changed.',
    });

    const stub = sinon
      .stub(ChangePasswordService, 'ChangePassword')
      .returns({ success: true, message: 'Password changed.' });

    await changePassword(req, res, next, ChangePasswordService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
