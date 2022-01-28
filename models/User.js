const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 16,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  activationCode: {
    type: Number,
  },
  verificationCode: {
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
// mySchema.index({field1: 1, field2: 1}, {unique: true});
