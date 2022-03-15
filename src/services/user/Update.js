const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { updateValidation, idValidation } = require('../../validations/user');

const cloudinary = require('../../utils/cloudinary');

class Update {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async UpdateUser(req, id) {
    const { body } = req;

    const { file } = req;

    if (file) {
      const fileUrl = req.file.path;
      body.profileUrl = fileUrl;
    }

    const { idError } = idValidation(id);
    if (idError) return { success: false, message: idError.details[0].message };

    const { updateError } = updateValidation(body);
    if (updateError)
      return { success: false, message: updateError.details[0].message };
    const user = await this.mongooseUser.get({ _id: id });

    if (user) {
      let fileName = user.profileUrl.replace(/.*\//, '');

      fileName = fileName.replace(/\.[^/.]+$/, '');
      console.log(fileName);

      cloudinary.uploader.destroy(fileName, { invalidate: true }, (result) => {
        console.log(result);
      });
      
    }

    try {
      const result = await this.mongooseUser.update(id, body);

      if (result) return { result, success: true, message: 'User updated' };

      return { success: false, message: 'User could not be updated.' };
    } catch (err) {
      return {
        success: false,
        message: `User could not be updated. Error:${err}`,
      };
    }
  }
}
module.exports = Update;
