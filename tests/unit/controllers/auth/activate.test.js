const { expect } = require('chai');

const hoaxer = require('hoaxer');

const { Activate } = require('../../../../src/services/auth');

const { User } = require('../../../../src/models');

const MongooseService = require('../../../../src/services/Mongoose');

const { activate } = require('../../../../src/controllers/auth');

const mongoose = require('mongoose');

const sinon = require('sinon');

const MongooseServiceInstance = new MongooseService(User);

describe('Activate controller', () => {
  const id = new mongoose.Types.ObjectId();
  let ActivateService, req, res, next;
  next = () => {};
  req = { body: { id, activationCode: 5662 } };
  res = {
    json: function () {},
    status: function () {},
  };

  ActivateService = new Activate(MongooseServiceInstance);

  it('should activate a user', async function () {
    const mock = sinon.mock(res);
    mock.expects('status').once().withExactArgs(200);

    mock.expects('json').once().withExactArgs({
      success: true,
      message: 'User activated.',
    });

    const stub = sinon
      .stub(ActivateService, 'Activate')
      .returns({ success: true, message: 'User activated.' });

    await activate(req, res, next, ActivateService);

    expect(stub.calledOnce).to.be.true;

    mock.verify();
  });
});
