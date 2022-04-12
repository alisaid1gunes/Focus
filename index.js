const express = require('express');


const loaders = require('./src/loaders');

const { PORT } = require('./src/config/config.js');

const startServer = async () => {
  const port = PORT;
  const app = express();
  await loaders({ expressApp: app });

  app
    .listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    })
    .on('error', (err) => {
      console.log(err.message);
    });
};

startServer();
