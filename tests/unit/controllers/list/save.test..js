const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Save } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { save } = require('../../../../src/controllers/list');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(List);

describe('List save controller', () => {
  const id = new mongoose.Types.ObjectId();
  let SaveService, req, res, next;
  next = () => {};
  const list = {
    _id: id,
    name: hoaxer.internet.userName(),
    userId: id,
    tasks: [],
  };
  req = { body: list };
  res = {
    json: function () {},
    status: function () {},
  };

  SaveService = new Save(MongooseServiceInstance);

  it('should save a List', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      list,
      success: true,
      message: 'List saved.',
      success: true,
    });

    const stub = sinon
      .stub(SaveService, 'SaveList')
      .returns({ list, success: true, message: 'List saved.' });

    await save(req, res, next, SaveService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
    expect(true).to.be.true;
  });
});
