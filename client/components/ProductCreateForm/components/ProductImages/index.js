/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input, FormGroup } from 'reactstrap';
import Carousel from '@brainhubeu/react-carousel';

import ImagePreview from './components/ImagePreview';

const ProductImages = ({ productData, handleProductData }) => {
  const [images, setImages] = useState([]);

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
    let i = 0;

    while (i < files.length) {
      const promFn = toBase64(files[i]);
      filesPromises.push(promFn);

      i += 1;
    }

    const base64Files = await Promise.all(filesPromises);
    const newImagesArr = images.concat(
      base64Files.filter((item) => images.indexOf(item) < 0)
    );

    setImages(newImagesArr);

    handleProductData({ ...productData, newImagesArr });
  };

  const handleRemoveImage = async (idx) => {
    const removeItem = (items, i) =>
      items.slice(0, i).concat(items.slice(i + 1, items.length));

    const newImagesArr = removeItem(images, idx);

    setImages(newImagesArr);

    handleProductData({ ...productData, newImagesArr });
  };

  return (
    <FormGroup>
      <Input type="file" multiple onChange={handleImageData} />
      {images && images.length > 0 && (
        <Carousel slidesPerPage={images.length > 1 ? 2 : 1} arrows>
          {images.map((item, i) => (
            <ImagePreview
              key={i}
              idx={i}
              srcImg={item}
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
    inStock: PropTypes.number,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      currencySign: PropTypes.string,
      value: PropTypes.number,
    }),
  }).isRequired,
  handleProductData: PropTypes.func.isRequired,
};

export default ProductImages;
