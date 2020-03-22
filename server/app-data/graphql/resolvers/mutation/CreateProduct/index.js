const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { verifyToken, storeFile } = require('../../utils');
const modError = require('../../utils/error');

const createProduct = async (root, { productInput }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const { title } = productInput;

    const productExist = await Product.findOne({ title });

    if (productExist) {
      throw new modError(403, 'Product already exist.');
    }

    const {
      images,
      ...prodRawDataWithOutImgs
    } = productInput; 

    const productData = new Product(prodRawDataWithOutImgs);

    let i = 0;
    const imagesDataArr = [];
    const resultImagesDataArr = [];
    let imagePaths = [];
    
    if (images && images.length > 0) {
      while (i < images.length) {
        const { base64, title, ext } = images[i];

        const fileData = {
          fileName: title,
          fileBase64Data: base64,
          dirName: productData._id,
          extension: ext,
        };

        const promiseFn = storeFile(fileData);

        imagesDataArr.push(promiseFn);

        i += 1;
      }

      imagePaths = await Promise.all(imagesDataArr);

      let j = 0;

      while (j < imagePaths.length) {
        const {
          base64,
          ...restImageData
        } = images[j];
        const imageData = {
          ...restImageData,
          path: imagePaths[j],
        };

        resultImagesDataArr.push(imageData);

        j += 1;
      }
    }

    const newProductData = {
      ...productData.toObject(),
      images: resultImagesDataArr,
    };

    const newProduct = await Product.create(newProductData);

    const {
      __v,
      ...result
    } = newProduct.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createProduct;
