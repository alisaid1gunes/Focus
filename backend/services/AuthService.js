const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RefreshToken = require('../models/RefreshToken');

const MongooseService = require('./MongooseService');

const { registerValidation } = require('../validations/validations');

class AuthService {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async RegisterUser(body) {
    const bodyIn = body;
    const { error } = registerValidation(bodyIn);
    if (error) return error.details[0].message;

    const emailExist = await this.mongooseUser.getEmail(bodyIn.email);
    if (emailExist) return 'email already exists';

    const salt = await bcrypt.genSalt(10);
    bodyIn.password = await bcrypt.hash(bodyIn.password, salt);

    try {
      const result = await this.mongooseUser.save(bodyIn);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = AuthService;
