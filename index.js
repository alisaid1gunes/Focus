const express = require('express');

const dotenv = require('dotenv');

const loaders = require('./loaders');

const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  dotenv.config({ path: './config/.env' });

  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    })
    .on('error', (err) => {
      console.log(err.message);
    });
};

startServer();
