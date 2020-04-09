import React from 'react';
import PropTypes from 'prop-types';

import { CloseBtn, Img, ImgPrevWrapper } from './styles';

const ImagePreview = ({ srcImg, removeImage, idx }) => (
  <ImgPrevWrapper>
    <CloseBtn onClick={() => removeImage(idx)}>&times;</CloseBtn>
    <Img src={srcImg} alt="Preview" />
  </ImgPrevWrapper>
);

ImagePreview.propTypes = {
  srcImg: PropTypes.string.isRequired,
  removeImage: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};

export default ImagePreview;
