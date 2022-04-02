const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Update } = require('../../../../src/services/task');

const { Task } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { update } = require('../../../../src/controllers/task');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(Task);

describe('Task update controller', () => {
  const id = new mongoose.Types.ObjectId();
  let UpdateService, req, res, next;
  next = () => {};
  const task = {
    _id: id,
    name: hoaxer.internet.userName(),
    done: false,
    email: hoaxer.internet.email(),
    userId: id,
  };
  req = { params: { id }, body: task };
  res = {
    json: function () {},
    status: function () {},
  };

  UpdateService = new Update(MongooseServiceInstance);

  it('should update a task that matches the id param', async function () {
  
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      task,
      success: true,
      message: 'Task updated.',
    });

    const stub = sinon
      .stub(UpdateService, 'UpdateTask')
      .returns({ task, success: true, message: 'Task updated.' });

    await update(req, res, next, UpdateService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
