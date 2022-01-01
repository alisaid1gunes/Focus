const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  taskId: {
    type: ObjectId,
    ref: 'Task',
    require: true,
  },
});
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 1,
    max: 25,
    required: true,
  },

  userId: {
    type: ObjectId,
    ref: 'User',
    require: true,
  },
  tasks: [taskSchema],
});

listSchema.set('timestamps', true);

module.exports = mongoose.model('Task', listSchema);
