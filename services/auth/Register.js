/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const MongooseService = require('../MongooseService');

const { registerValidation } = require('../../validations/validations');

class Register {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RegisterUser(body) {
    const bodyIn = body;

    const { error } = registerValidation(bodyIn);
    if (error) return { error: error.details[0].message, success: false };

    const emailExist = await this.mongooseUser.get({ email: bodyIn.email });

    if (emailExist) return { error: 'email already exists', success: false };

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    const code = Math.floor(1000 + Math.random() * 9000);

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    bodyIn.activation = {
      isActived: false,
      code,
      expireDate,
    };

    try {
      const user = await this.mongooseUser.save(bodyIn);

      eventEmitter.emit('signup', bodyIn.email, bodyIn.username, code);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { Register, eventEmitter };
