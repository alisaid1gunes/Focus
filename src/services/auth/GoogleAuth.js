/* eslint-disable no-underscore-dangle */
const { GoogleRegister } = require('./GoogleRegister');

const GoogleLogin = require('./GoogleLogin');

class GoogleAuth {
  constructor(MongooseUser, MongooseRefresh) {
    this.mongooseUser = MongooseUser
    this.googleRegister = new GoogleRegister(MongooseUser);
    this.googleLogin = new GoogleLogin(MongooseUser, MongooseRefresh);
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
