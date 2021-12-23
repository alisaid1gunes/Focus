const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    require: true,
  },
  userId: {
    type: ObjectId,
    require: true,
  },
});
module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
