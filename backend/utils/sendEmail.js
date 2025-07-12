const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,     // your email@gmail.com
      pass: process.env.EMAIL_APP_PASSWORD, // app password from Gmail
    },
  });

  const mailOptions = {
    from: `"Divido" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
