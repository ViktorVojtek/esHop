const ver: string = 'CK-01';

export const config = {
  dbName: `esHop-${ver}`,
  gp: {
    ClientID: '10007901',
    ClientName: 'Amicus',
    ClientPass: 'Hamicus064',
    ClientSecret: 'J3EMGn8d',
    StoreKey: 'E7007901',
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
  superSecret:
    'supersecretEcMcStringhTgyhatshouldbeNotBrokenevjjer59234fEfNgLgIjjeerarsstt4kk21l1',
};
