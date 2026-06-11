import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
