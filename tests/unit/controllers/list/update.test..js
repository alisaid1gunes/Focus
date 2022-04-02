const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Update } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { update } = require('../../../../src/controllers/list');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(List);

describe('List update controller', () => {
  const id = new mongoose.Types.ObjectId();
  let UpdateService, req, res, next;
  next = () => {};
  const list = {
    _id: id,
    name: hoaxer.internet.userName(),
    userId: id,
    tasks: [],
  };
  req = { params: { id }, body: list };
  res = {
    json: function () {},
    status: function () {},
  };

  UpdateService = new Update(MongooseServiceInstance);

  it('should update a list that matches the id param', async function () {
  
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      list,
      success: true,
      message: 'List updated.',
    });

    const stub = sinon
      .stub(UpdateService, 'UpdateList')
      .returns({ list, success: true, message: 'List updated.' });

    await update(req, res, next, UpdateService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
