const sendEmail = require('../services/Email');

const { registerEmitter, forgetEmitter } = require('../services/auth');

registerEmitter.on('signup', async (email, username, code) => {
  console.log('on içerde');
  const msg = {
    to: email,
    from: process.env.VERIFIED_SENDER,
    subject: 'Welcome to Todo App',
    text: `Thank you for joining ${username}. This is your activation code: ${code}`,
  };

  sendEmail(msg);
});

forgetEmitter.on('forget-password', async (email, username, code) => {
  console.log('on içerde');
  const msg = {
    to: email,
    from: process.env.VERIFIED_SENDER,
    subject: 'Forget Password',
    text: `Hey did you forget your password ? ${username}. This is your veritification code: ${code}`,
  };
  sendEmail(msg);
});
