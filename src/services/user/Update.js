const fs = require('fs');

const { promisify } = require('util');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const unlinkAsync = promisify(fs.unlink);

const { updateValidation, idValidation } = require('../../validations/user');

class Update {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async UpdateUser(req, id) {
    const { body } = req;

    const { file } = req;

    if (file) {
      const fileUrl = req.file.path.replace(/\\/g, '/');
      body.profileUrl = fileUrl;
    }

    const { idError } = idValidation(id);
    if (idError) return { success: false, message: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, message: updateError.details[0].message };
    const user = await this.mongooseUser.get({ _id: id });

    if (user) await unlinkAsync(user.profileUrl);

    try {
      const result = await this.mongooseUser.update(id, body);

      if (result) return { result, success: true message: 'User updated' };s
      return { success: false, message: 'User could not be updated.' };
    } catch (err) {
      return { success: false, message: `User could not be updated. Error:${err}` };
    }
  }
}
module.exports = Update;
