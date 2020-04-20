/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Input, FormGroup } from 'reactstrap';
import Carousel from '@brainhubeu/react-carousel';

import ImagePreview from './components/ImagePreview';

const ProductImages = ({ productData, handleProductData }) => {
  const [images, setImages] = useState(productData.images || []);

  useEffect(() => {
    setImages(productData.images || []);
  }, [productData]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageData = async (event) => {
    const { files } = event.currentTarget;
    const filesPromises = [];
    const filesObjsArr = [];
    const imagesObjArr = [];
    let i = 0;
    let j = 0;

    const bytesToSize = (bytes) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

      if (bytes === 0) {
        return '0 Byte';
      }

      const c = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

      return `${Math.round(bytes / 1024 ** c, 2)} ${sizes[c]}`;
    };

    while (i < files.length) {
      const promFn = toBase64(files[i]);

      filesObjsArr.push({
        ext: files[i].type.replace('image/', ''),
        size: bytesToSize(files[i].size),
        title: files[i].name.split('.')[files[i].name.split('.').length - 2],
      });
      filesPromises.push(promFn);

      i += 1;
    }

    const base64Files = await Promise.all(filesPromises);

    while (j < filesObjsArr.length) {
      imagesObjArr.push({
        ...filesObjsArr[j],
        base64: base64Files[j],
      });

      j += 1;
    }

    const newImagesArr = images.concat(
      imagesObjArr.filter((item) => images.indexOf(item.base64) < 0)
    );

    setImages(newImagesArr);

    handleProductData({ ...productData, images: newImagesArr });
  };

  const handleRemoveImage = async (idx) => {
    const removeItem = (items, i) =>
      items.slice(0, i).concat(items.slice(i + 1, items.length));

    const newImagesArr = removeItem(images, idx);

    setImages(newImagesArr);

    handleProductData({ ...productData, images: newImagesArr });
  };

  return (
    <FormGroup>
      <Input
        type="file"
        multiple
        onChange={handleImageData}
        accept="image/x-png,image/gif,image/jpeg"
      />
      {images && images.length > 0 && (
        <Carousel slidesPerPage={images.length > 1 ? 2 : 1} arrows>
          {images.map(({ base64, path }, i) => (
            <ImagePreview
              key={i}
              idx={i}
              srcImg={base64 || path}
              removeImage={handleRemoveImage}
            />
          ))}
        </Carousel>
      )}
    </FormGroup>
  );
};

ProductImages.propTypes = {
  productData: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    inStock: PropTypes.bool,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.arrayOf(
      PropTypes.shape({
        default: PropTypes.bool,
        title: PropTypes.string,
        price: PropTypes.shape({
          currency: PropTypes.string,
          currencySign: PropTypes.string,
          discount: PropTypes.number,
          value: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
  handleProductData: PropTypes.func.isRequired,
};

export default ProductImages;
