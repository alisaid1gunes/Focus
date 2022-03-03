const mongoose = require('mongoose');

module.exports = async () => {
  const { connection } = await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  return connection.db;
};
