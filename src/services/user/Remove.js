const { removeValidation } = require('../../validations/user');

const cloudinary = require('../../utils/cloudinary');

class Remove {
  constructor(MongooseService) {
    this.mongooseUser = MongooseService;
  }

  async RemoveUser(id) {
    const { error } = removeValidation(id);
    if (error) return { success: false, error: error.details[0].message };
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
      await this.mongooseUser.delete({ _id: id });
      return { message: 'User deleted', success: true };
    } catch (err) {
      return {
        success: false,
        message: `User could not be deleted. Error:${err}`,
      };
    }
  }
}
module.exports = Remove;
