const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { GetOne } = require('../../../../src/services/task');

const { Task } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { getOne } = require('../../../../src/controllers/task');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(Task);

describe('Task getOne controller', () => {
  const id = new mongoose.Types.ObjectId();
  let GetOneService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

  GetOneService = new GetOne(MongooseServiceInstance);

  it('should return a task that matches the user id param', async function () {
    const stubValue = {
      _id: id,
      name: hoaxer.internet.userName(),
      done: false,
      email: hoaxer.internet.email(),
      userId: id,
    };

    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock
      .expects('json')
      .once()
      .withExactArgs({
        stubValue,
        success: true,
        message: 'Task found',
        success: true,
      });

    const stub = sinon
      .stub(GetOneService, 'GetTask')
      .returns({ stubValue, success: true, message: 'Task found' });

    await getOne(req, res, next, GetOneService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
    expect(true).to.be.true;
  });
});
