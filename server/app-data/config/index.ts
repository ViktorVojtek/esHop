require('dotenv').config();

const ver: string = 'CK-01';

export const config = {
  dbName: `esHop-${ver}`,
  gp: {
    ClientID: process.env.GP_CLIENT_ID,
    ClientName: process.env.GP_CLIENT_NAME,
    ClientPass: process.env.GP_CLIENT_PASS,
    ClientSecret: process.env.GP_CLIENT_SECRET,
    StoreKey: process.env.GP_STOREKEY,
    SandBox: process.env.GP_SANDBOX,
  },
  mailer: {
    auth: {
      pass: process.env.EMAIL_PASS,
      user: process.env.EMAIL_LOGIN,
    },
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
  },
  superAdmin: {
    superAdminEmail: process.env.SUPERADMIN_EMAIL,
    superAdminFirstName: process.env.SUPERADMIN_FNAME,
    superAdminLastName: process.env.SUPERADMIN_LNAME,
    superAdminPassword: process.env.SUPERADMIN_PASS,
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET,
  },
  mailchimp: {
    secret: process.env.MAILCHIMP_SECRET,
  },

  superSecret: process.env.SUPERSECRET,
};
