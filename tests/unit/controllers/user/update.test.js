const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Update } = require('../../../../src/services/user');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { update } = require('../../../../src/controllers/user');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('User update controller', () => {
  const id = new mongoose.Types.ObjectId();
  let UpdateService, req, res, next;
  next = () => {};

  const user = {
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
  req = {
    params: { id },
    body: user,
  };
  res = {
    json: function () {},
    status: function () {},
  };

  UpdateService = new Update(MongooseServiceInstance);

  it('should update a user that matches the id param', async function () {
    const stubValue = {
      user,
      success: true,
      message: 'User updated',
    };

    const mock = sinon.mock(res);

    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs(stubValue);

    const stub = sinon
      .stub(UpdateService, 'UpdateUser')
      .returns(stubValue);

    await update(req, res, next, UpdateService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
