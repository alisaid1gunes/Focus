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
    default: false,
    require: true,
  },
});

taskSchema.set('timestamps', true);

module.exports = mongoose.model('Task', taskSchema);
