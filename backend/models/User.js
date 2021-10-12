const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 1,
    max: 25,
  },
  done: {
    type: Boolean,
    require: true,
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
    require: true,
    min: 8,
    max: 16,
  },
  tasks: [taskSchema],
  refreshtoken: {
    type: String,
  },
});
module.exports = mongoose.model('User', userSchema);
