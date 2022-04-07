const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Save } = require('../../../../src/services/task');

const { Task } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { save } = require('../../../../src/controllers/task');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(Task);

describe('Task save controller', () => {
  const id = new mongoose.Types.ObjectId();
  let SaveService, req, res, next;
  next = () => {};
  const task = {
    _id: id,
    name: hoaxer.internet.userName(),
    done: false,
    email: hoaxer.internet.email(),
    userId: id,
  };
  req = { body: task };
  res = {
    json: function () {},
    status: function () {},
  };

  SaveService = new Save(MongooseServiceInstance);

  it('should save a task', async function () {
    /*   const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      task,
      success: true,
      message: 'Task saved.',
      success: true,
    });

    const stub = sinon
      .stub(SaveService, 'SaveTask')
      .returns({ task, success: true, message: 'Task saved.' });

    await save(req, res, next, SaveService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();*/
  });
});
