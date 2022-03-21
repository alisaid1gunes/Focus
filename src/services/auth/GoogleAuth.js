/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const { GoogleRegister } = require('./GoogleRegister');

const GoogleLogin = require('./GoogleLogin');

class GoogleAuth {
  constructor(MongooseService) {
    this.mongooseUser = new MongooseService(User);
    this.googleRegister = new GoogleRegister(MongooseService);
    this.googleLogin = new GoogleLogin(MongooseService);
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
