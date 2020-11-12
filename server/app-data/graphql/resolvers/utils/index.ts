import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { writeFile, mkdirp, unlink, remove } from 'fs-extra';
import Invoices from '../../../db/models/Invoices';
import Order from '../../../db/models/Order';

export async function validateHuman(recaptchaToken: string): Promise<boolean> {
  const secret = '6LcS98QZAAAAAN9eTUofGsaAttRhzCVI_CsNPSXG';
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data.success;
}

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

        const resultFilePath = `/static${filePath
          .split('static')[1]
          .replace(/\\/g, '/')}`;

        resolve(resultFilePath);
      });
    });
  });

export function getVariantImagesPaths(
  images: { base64: string; title: string; ext: string }[],
  vId: string
): Promise<any[]> {
  let j: number = 0;
  const variantImagesDataArr = [];

  return new Promise(async (resolve) => {
    while (images.length > j) {
      const { base64, title: imageTitle, ext } = images[j];

      const fileData = {
        fileName: imageTitle,
        fileBase64Data: base64,
        dirName: vId,
        extension: ext,
      };

      const promiseFn = storeFile(fileData);

      variantImagesDataArr.push(promiseFn);

      j += 1;
    }

    const paths = await Promise.all(variantImagesDataArr);

    let k = 0;
    const variantImagesData = [];

    while (paths.length > k) {
      const { base64, ...restImageData } = images[k];
      const imageData = {
        ...restImageData,
        path: paths[k],
      };

      variantImagesData.push(imageData);
      k += 1;
    }

    resolve(variantImagesData);
  });
}

export async function calculateOrderId(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      let orderId: string = '00000001';
      const lastOrder = await Order.findOne({}).sort({ created_at: -1 });

      if (lastOrder) {
        let oINum = parseInt(lastOrder.orderId) + 1;
        let zeros: string = '';

        for (
          let i = 0;
          i < lastOrder.orderId.length - String(oINum).length;
          i += 1
        ) {
          zeros += '0';
        }

        orderId = `${zeros}${oINum}`;

        resolve(orderId);
      }

      resolve(orderId);
    } catch (err) {
      reject(err);
    }
  });
}

export async function calculateInvoiceId(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const actualDate = new Date();
      const actualYear = actualDate.getFullYear();
      // porovnat previous rok - ak iny zacni od 0001 ak nie pokracuj
      const lastNumber = await Invoices.findOne({
        name: 'main',
      });

      let invoiceId: string = `00${actualYear}0001`;

      if (lastNumber) {
        let oldInvoiceId = lastNumber.count;
        const previousYear = oldInvoiceId.toString().substring(0, 4);
        if (+previousYear < actualYear) {
          invoiceId = `00${actualYear}0001`;
          oldInvoiceId = parseInt(invoiceId);

          await Invoices.updateOne({ name: 'main' }, { count: oldInvoiceId });
        } else {
          let iINum = oldInvoiceId + 1;
          let zeros: string = '';

          for (let i = 0; i < 2; i += 1) {
            zeros += '0';
          }

          invoiceId = `${zeros}${iINum}`;

          await Invoices.updateOne(
            { name: 'main' },
            { count: oldInvoiceId + 1 }
          );
        }
        resolve(invoiceId);
      } else {
        await Invoices.create({ name: 'main', count: parseInt(invoiceId) });
      }

      resolve(invoiceId);
    } catch (err) {
      reject(err);
    }
  });
}
