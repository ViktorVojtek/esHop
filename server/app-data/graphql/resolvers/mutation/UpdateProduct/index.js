const mongoose = require('mongoose');
const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { verifyToken, storeFile } = require('../../utils');
const modError = require('../../utils/error');

const updateProduct = async (root, { _id, productInput }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const { title } = productInput;

    const productExist = await Product.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!productExist) {
      throw new modError(404, 'Product not exist.');
    }

    const {
      images,
      ...prodRawDataWithOutImgs
    } = productInput; 

    const productData = new Product(prodRawDataWithOutImgs);

    let i = 0;
    const imagesDataArr = [];
    let resultImagesDataArr = [];
    const updateImagesArr = [];
    const existingImagesArr = []
    let imagePaths = [];
    
    if (images && images.length > 0) {
      while (i < images.length) {
        if (images[i].base64) {
          const { base64, title, ext } = images[i];

          const fileData = {
            fileName: title,
            fileBase64Data: base64,
            dirName: productData._id,
            extension: ext,
          };

          const promiseFn = storeFile(fileData);

          imagesDataArr.push(promiseFn);
        } else if (images[i].path) {
          existingImagesArr.push(images[i]);
        }

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

        updateImagesArr.push(imageData);

        j += 1;
      }
     
      resultImagesDataArr = updateImagesArr.concat(existingImagesArr);
    }

    const newProductData = {
      ...productData.toObject(),
      images: resultImagesDataArr,
    };

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { $set: newProductData },
      { new: true },
    );

    const {
      __v,
      ...result
    } = updatedProduct.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = updateProduct;
