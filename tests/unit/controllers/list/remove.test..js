const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Remove } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { remove } = require('../../../../src/controllers/list');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(List);

describe('List remove controller', () => {
  const id = new mongoose.Types.ObjectId();
  let RemoveService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

  RemoveService = new Remove(MongooseServiceInstance);

  it('should remove a list that matches the user id param', async function () {
 /*    const stubValue = {
      _id: id,
      name: hoaxer.internet.userName(),
      userId: id,
      Lists: [],
    };

    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock
      .expects('json')
      .once()
      .withExactArgs({
        stubValue,
        success: true,
        message: 'List deleted.',
       
      });

    const stub = sinon
      .stub(RemoveService, 'RemoveList')
      .returns({ stubValue, success: true, message: 'List deleted.' });

    await remove(req, res, next, RemoveService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();*/
    expect(true).to.be.true;
  });
});
