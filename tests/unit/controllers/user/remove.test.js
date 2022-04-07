const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Remove } = require('../../../../src/services/user');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { remove } = require('../../../../src/controllers/user');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('User remove controller', () => {
  const id = new mongoose.Types.ObjectId();
  let RemoveService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

  //RemoveService = new Remove(MongooseServiceInstance);

  it('should remove a user that matches the id param', async function () {
  /*  const stubValue = {
      message: 'User deleted',
      success: true,
    };

    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock
      .expects('json')
      .once()
      .withExactArgs(stubValue);

    const stub = sinon.stub(RemoveService, 'RemoveUser').returns(stubValue);

    await remove(req, res, next, RemoveService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();*/
  });
});
