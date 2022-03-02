const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: Number,
  },
  expireDate: {
    type: Date,
  },
});

const activationSchema = new mongoose.Schema({
  isActivated: {
    type: Boolean,
    default: false,
  },
  code: {
    type: Number,
  },
  expireDate: {
    type: Date,
  },
});

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
    min: 8,
    max: 16,
  },

  activation: activationSchema,
  verification: verificationSchema,

  profileUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('User', userSchema);
