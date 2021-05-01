import nodemailer from 'nodemailer';

function sendMailNotification(rezervationData: any): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: process.env.EMAIL_LOGIN, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Eshop KupeleCKS dopyt" <eshop@kupelecks.sk>',
        to: 'rezervacie@kupelecks.sk', // list of receivers
        subject: 'Žiadosť o rezerváciu eshop Kupele CKS', // Subject line
        html: `<p>Meno a priezvisko: ${rezervationData.firstName} ${rezervationData.lastName}</p><p>Email: <a href='mailto:${rezervationData.email}'>${rezervationData.email}</a></p><p>Služba: <span style="font-weight: bold">${rezervationData.service}</span></p><p>Správa: <span style="font-weight: bold">${rezervationData.message}</span></p>`, // html body
      });
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export default async (
  root: any,
  args: {
    rezervationData: any;
  },
  ctx: any
): Promise<String> => {
  const { rezervationData } = args;
  try {
    await sendMailNotification(rezervationData);

    return 'success';
  } catch (err) {
    throw new Error(err.message);
  }
};
