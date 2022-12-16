const nodemailer=require('nodemailer')
const config= require('../config/index.js')


let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
  });

  module.exports=transporter