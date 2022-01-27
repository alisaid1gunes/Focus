const sendEmail = require('../services/EmailService');

const { eventEmitter } = require('../services/AuthService');

eventEmitter.on('signup', async (email, username, code) => {
  const msg = {
    to: email,
    from: process.env.VERIFIED_SENDER,
    subject: 'Welcome to Todo App',
    text: `Thank you for joining ${username}. This is your veritification code: ${code}`,
  };
  sendEmail(msg);
});
