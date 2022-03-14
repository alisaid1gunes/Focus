const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = require('../config/config');

const sendEmail = async (content) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  try {
    await sgMail.send(content);
  } catch (e) {
    console.error(`Error sending Email ${e.message}`);
  }
};

module.exports = sendEmail;
