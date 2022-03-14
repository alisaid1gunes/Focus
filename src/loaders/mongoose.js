const mongoose = require('mongoose');

const { DB_CONNECT } = require('../config/config.js');

module.exports = async () => {
  
  const { connection } = await mongoose.connect(DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  return connection.db;
};
