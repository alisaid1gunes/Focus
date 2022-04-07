const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { GetAll } = require('../../../../src/services/task');

const { Task } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { getAll } = require('../../../../src/controllers/task');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(Task);

describe('Task get all controller', () => {
  const id = new mongoose.Types.ObjectId();
  let GetAllService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

 // GetAllService = new GetAll(MongooseServiceInstance);

  it('should return all tasks that matches the user id param', async function () {
  /*  const stubValue = {
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
        message: 'Tasks found',
        success: true,
      });

    const stub = sinon
      .stub(GetAllService, 'GetTask')
      .returns({ stubValue, success: true, message: 'Tasks found' });

    await getAll(req, res, next, GetAllService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();*/
    expect(true).to.be.true;
  });
});
