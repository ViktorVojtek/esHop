import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 6rem;
`;
export const H2 = styled.h2`
  margin-top: 3rem;
`;
export const Text = styled.p`
  font-size: 0.8rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  width: 400px;
  margin-top: 1rem;
  letter-spacing: 1px;
`;
export const Items = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  position: relative;
`;

export const LeftItem = styled.div`
  width: 60%;
  position: relative;
`;

export const RightItem = styled.div`
  width: 40%;
  position: relative;
`;

export const ItemPhotoLeft = styled.div`
  margin-right: 50px;
  position: relative;
  padding-top:60%;
  background-image: ${({ imageUrlL }) => (imageUrlL ? `url(${imageUrlL})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
`;

export const ItemPhotoRight = styled.div`
  padding-top: 100%;
  margin-left: 50px;
  margin-top: 220px;
  position: relative;
  background-image: ${({ imageUrlR }) => (imageUrlR ? `url(${imageUrlR})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
`;

export const TextArea = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0px;
  padding: 3rem;
  margin-left: 50%;
  transform: translate(-50%, 50%);
  border-radius: 4px;
`;

export const ProductHeader = styled.h4`

`;

export const Gradient = styled.div`
  display: ${({ gradient1 }) => (gradient1 ? 'block' : 'none')};
  position: absolute;
  background: linear-gradient(90deg, rgba(193,228,249,1) 0%, #f4f9ff 100%);
  width: ${({ width }) => (width ? `${width}%` : '0')};
  height: ${({ height }) => (height ? `${height}%` : '0')};
  top: ${({ top }) => (top ? `${top}%` : '0')};
  right: ${({ right }) => (right ? `${right}px` : '0')};
`;

