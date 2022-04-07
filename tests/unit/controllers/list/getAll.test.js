const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { GetAll } = require('../../../../src/services/list');

const { List } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { getAll } = require('../../../../src/controllers/list');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(List);

describe('List get all controller', () => {
  const id = new mongoose.Types.ObjectId();
  let GetAllService, req, res, next;
  next = () => {};

  req = { params: { id } };
  res = {
    json: function () {},
    status: function () {},
  };

  GetAllService = new GetAll(MongooseServiceInstance);

  it('should return all list that matches the user id param', async function () {
  /*   const stubValue = {
      _id: id,
      name: hoaxer.internet.userName(),
      userId: id,
      tasks: [],
    };

    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      stubValue,
      success: true,
      message: 'List found.',
      success: true,
    });

    const stub = sinon
      .stub(GetAllService, 'GetList')
      .returns({ stubValue, success: true, message: 'List found.' });

    await getAll(req, res, next, GetAllService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();*/
  });
});
