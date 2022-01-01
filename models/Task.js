const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 1,
    max: 25,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
    require: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    require: true,
  },
});

taskSchema.set('timestamps', true);

module.exports = mongoose.model('Task', taskSchema);
