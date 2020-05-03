/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqid = require('uniqid');
const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { verifyToken, storeFile } = require('../../utils');
const ModError = require('../../utils/error');

const updateProduct = async (root, { _id, productInput }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const productExist = await Product.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!productExist) {
      throw new ModError(404, 'Product not exist.');
    }

    const {
      images,
      ...prodRawDataWithOutImgs
    } = productInput;

    const productData = prodRawDataWithOutImgs;

    let i = 0;
    const imagesDataArr = [];
    let resultImagesDataArr = [];
    const updateImagesArr = [];
    const existingImagesArr = [];
    let imagePaths = [];

    const oldImagesArr = productExist.images;
    let imagesToDelete = [];

    console.log(oldImagesArr);

    imagesToDelete = oldImagesArr.filter((oldItem) => {
      return !images.some((cItem) => {
        return oldItem.imageId !== cItem.imageId;
      });
    });
    
    console.log('images to delete');
    console.log(imagesToDelete);

    if (images && images.length > 0) {
      while (i < images.length) {
        if (images[i].base64) {
          const { base64, title, ext } = images[i];

          const fileData = {
            fileName: title,
            fileBase64Data: base64,
            dirName: _id,
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

      console.log(imagePaths);

      let j = 0;

      while (j < imagePaths.length) {
        const {
          base64,
          ...restImageData
        } = images[j];
        const imageData = {
          ...restImageData,
          imageId: uniqid('img-'),
          path: imagePaths[j],
        };

        updateImagesArr.push(imageData);

        j += 1;
      }

      console.log(updateImagesArr);

      resultImagesDataArr = updateImagesArr.concat(existingImagesArr);
    }

    const newProductData = {
      ...productData,
      images: resultImagesDataArr,
    };

    console.log('\n');
    console.log(newProductData);

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          category: newProductData.category,
          description: newProductData.description,
          inStock: newProductData.inStock,
          modifiedByUserId: newProductData.modifiedByUserId,
          shortDescription: newProductData.shortDescription,
          subCategory: newProductData.subCategory,
          images: newProductData.images,
          note: newProductData.note,
          title: newProductData.title,
          variant: newProductData.variant
        }
      },
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
