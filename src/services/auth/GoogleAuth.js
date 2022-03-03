/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { GoogleRegister } = require('./GoogleRegister');

const GoogleLogin = require('./GoogleLogin');

class GoogleAuth {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.googleRegister = new GoogleRegister();
    this.googleLogin = new GoogleLogin();
  }

  async Auth(email, name, imageUrl) {
    const emailExist = await this.mongooseUser.get({ email });

    if (emailExist) {
      return this.googleLogin(emailExist);
    }
    return this.googleREgister(email, name, imageUrl);
  }
}

module.exports = GoogleAuth;
