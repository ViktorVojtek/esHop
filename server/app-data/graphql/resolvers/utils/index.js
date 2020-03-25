const jwt = require('jsonwebtoken');
const path = require('path');
const {
  writeFile, mkdirp, unlink, remove,
} = require('fs-extra');

const verifyToken = (ctx, secret) => (
  new Promise((resolve, reject) => {
    const { token } = ctx;

    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
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

const removeDir = (dirPath) => (
  new Promise((resolve, reject) => {
    remove(dirPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })
);

const removeFile = (filePath) => (
  new Promise((resolve, reject) => {
    unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })
);

const storeFile = (fileData) => (
  new Promise((resolve, reject) => {
    const {
      fileName,
      fileBase64Data,
      dirName,
      extension,
    } = fileData;

    const base64Data = fileBase64Data.split(';base64,')[1];
    const ext = extension;

    const extNorm = ext === 'jpeg' ? 'jpg' : ext;

    const dir = path.resolve(
      __dirname, `../../../../../public/products/${dirName}`,
    );
    const filePath = `${dir}/${fileName.toLowerCase()}.${extNorm}`;

    mkdirp(dir, (dirErr) => {
      if (dirErr) {
        reject(dirErr);
      }

      writeFile(filePath, base64Data, { encoding: 'base64' }, (wFerr) => {
        if (wFerr) {
          reject(wFerr);
        }

        const resultFilePath = `${(filePath.split('public')[1]).replace(/\\/g, '/')}`;

        resolve(resultFilePath);
      });
    });
  })
);

module.exports = {
  removeDir,
  removeFile,
  verifyToken,
  storeFile,
};