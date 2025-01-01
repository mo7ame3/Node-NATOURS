const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Mohamed Magdy <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });
  }

  async send(text) {
    // send to actual email
    // 1) Render HTML based on a pug template
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: 'Your password reset token (valid for 10 minutes)',
      text,
      // html: '<h1>Hello world!</h1>',
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  sendWelcome() {
    // Implementation for sending a welcome email
  }
};
