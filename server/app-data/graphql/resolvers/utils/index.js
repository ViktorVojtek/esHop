const jwt = require('jsonwebtoken');

const verifyToken = (ctx, secret) => (
  new Promise((resolve, reject) => {
    const { token } = ctx;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      const { exp } = decoded;
      const expires = exp * 1000;
      const now = new Date().getTime();

      if (now > expires) {
        const tokenExpired = new Error('Token has expired');

        tokenExpired.code = 401;
        reject(tokenExpired);
      }

      resolve(true);
    });
  })
);

module.exports = {
  verifyToken
};