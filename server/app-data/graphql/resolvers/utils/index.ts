import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { writeFile, mkdirp, unlink, remove } from 'fs-extra';

export const verifyToken: (ctx: any, secret: string) => Promise<void> = (
  ctx,
  secret
) =>
  new Promise((resolve, reject) => {
    const { token } = ctx;

    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        reject(err);
      }

      const { exp } = decoded as any;
      const expires = exp * 1000;
      const now = new Date().getTime();

      if (now > expires) {
        const tokenExpired = new Error('Token has expired');

        reject(tokenExpired);
      }

      resolve();
    });
  });

export const removeDir: (dirPath: string) => Promise<void | Error> = (
  dirPath
) =>
  new Promise((resolve, reject) => {
    remove(dirPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

export const removeFile: (filePath: string) => Promise<void | Error> = (
  filePath
) =>
  new Promise((resolve, reject) => {
    unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

export const storeFile: (fileData: any) => Promise<string | Error> = (
  fileData
) =>
  new Promise((resolve, reject) => {
    const { fileName, fileBase64Data, dirName, extension } = fileData;

    const base64Data: string = fileBase64Data.split(';base64,')[1];
    const ext: string = extension;

    const extNorm: string = ext === 'jpeg' ? 'jpg' : ext;

    const dir: string = path.resolve(
      __dirname,
      `../../../../../static/products/${dirName}`
    );
    const filePath: string = `${dir}/${fileName.toLowerCase()}.${extNorm}`;

    mkdirp(dir, (dirErr) => {
      if (dirErr) {
        reject(dirErr);
      }

      writeFile(filePath, base64Data, { encoding: 'base64' }, (wFerr) => {
        if (wFerr) {
          reject(wFerr);
        }

        const resultFilePath = `${filePath
          .split('static')[1]
          .replace(/\\/g, '/')}`;

        resolve(resultFilePath);
      });
    });
  });
