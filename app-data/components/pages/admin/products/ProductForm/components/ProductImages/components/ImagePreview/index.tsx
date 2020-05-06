import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { CloseBtn, Img, ImgPrevWrapper } from './styles';

interface IPreviewImage {
  srcImg: string;
  removeImage: (idx: number) => Promise<void>;
  idx: number;
}
const ImagePreview: FC<IPreviewImage> = ({ srcImg, removeImage, idx }) => (
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
