const sgMail = require('@sendgrid/mail');

const sendEmail = async (content) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send(content);
  } catch (e) {
    console.error(`Error sending Email ${e.message}`);
  }
};

module.exports = sendEmail;
