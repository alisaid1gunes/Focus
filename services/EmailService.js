const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (content) => {
  try {
    await sgMail.send(content);
  } catch (e) {
    console.error(`Error sending Email ${e.message}`);
  }
};

module.exports = sendEmail;
