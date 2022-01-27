const expressLoader = require('./express');

const mongooseLoader = require('./mongoose');

require('./events');

module.exports = async ({ expressApp }) => {
  try {
    await mongooseLoader();
    console.log('connected to mongo');
  } catch (err) {
    console.error(`Connection refused. Error: ${err}`);
  }

  expressLoader(expressApp);
};
