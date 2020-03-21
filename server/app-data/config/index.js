const ver = 'CK-01'

module.exports = {
  dbName: `esHop-${ver}`,
  gp: {
    ClientID: '1209532907',
    ClientSecret: 'J3EMGn8d',
    SandBox: true,
  },
  mailer: {
    auth: {
      pass: 'windowsXP8975',
      user: 'viktor.vojtek@codebrothers.sk',
    },
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    ignoreTLS: true,
  },
  superAdmin: {
    superAdminEmail: 'viktor.vojtek@codebrothers.sk',
    superAdminFirstName: 'Viktor',
    superAdminLastName: 'Vojtek',
    superAdminPassword: 'cb963',
  },
  superSecret: 'supersecretEcMcStringhTgyhatshouldbeNotBrokenevjjer59234fEfNgLgIjjeerarsstt4kk21l1',
};
