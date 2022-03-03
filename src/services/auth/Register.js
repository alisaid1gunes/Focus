/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const registerEmitter = new EventEmitter();

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { registerValidation } = require('../../validations/auth');

class Register {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async RegisterUser(req) {
    const bodyIn = req.body;
    const { file } = req;
    if (!file)
      return {
        error: ' File type must be jpg or png and file size must less than 5MB',
        success: false,
      };

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
    const fileUrl = req.file.path.replace(/\\/g, '/');

    bodyIn.profileUrl = fileUrl;

    try {
      const user = await this.mongooseUser.save(bodyIn);

      registerEmitter.emit('signup', bodyIn.email, bodyIn.username, code);

      return { success: true, user };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { Register, registerEmitter };
