const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a Transaction
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Mohamed Magdy <momagdy@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.htmlMessage,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
