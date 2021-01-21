import React from 'react';
import styled from 'styled-components';

export const Img = styled.img`
  max-width: inherit;
`;

export const ImgPrevWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  max-width: 250px;
`;

export const CloseBtn = styled.button`
  background-color: #c0392b;
  border: 0;
  border-radius: 50%;
  color: #fdfefe;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
`;

interface IPreviewImage {
  srcImg: string;
  removeImage: (idx: number) => Promise<void>;
  idx: number;
}
export default ({ srcImg, removeImage, idx }: IPreviewImage): JSX.Element => {
  return (
    <ImgPrevWrapper>
      <CloseBtn onClick={() => removeImage(idx)}>&times;</CloseBtn>
      <Img src={srcImg} alt="Preview" />
    </ImgPrevWrapper>
  );
};
