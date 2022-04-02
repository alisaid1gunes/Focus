const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Get } = require('../../../../src/services/user');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { get } = require('../../../../src/controllers/user');

const mongoose = require('mongoose');

const sinon = require('sinon');
const MongooseServiceInstance = new MongooseService(User);

describe('User get controller', () => {
  const id = new mongoose.Types.ObjectId();
  let GetService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function (params) {
      console.log(params);
    },
  };

  GetService = new Get(MongooseServiceInstance);

  it('should return a user that matches the id param', async function () {
    const stubValue = {
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

    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock
      .expects('json')
      .once()
      .withExactArgs({ user: stubValue, success: true });

    const stub = sinon
      .stub(GetService, 'GetUser')
      .returns({ user: stubValue, success: true });

    await get(req, res, next, GetService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
