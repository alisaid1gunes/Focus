const mongoose = require('mongoose');

const testModelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model('TestModel', testModelSchema);
