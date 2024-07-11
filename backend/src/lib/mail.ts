import nodemailer from 'nodemailer'; // npm i nodemailer // npm i --save-dev @types/nodemailer for email fake send

export async function getMailClient() {
  const account = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email', // https://ethereal.email/
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
}
