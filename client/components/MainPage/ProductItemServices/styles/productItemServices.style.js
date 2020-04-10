import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
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
  width: 50%;
  position: relative;
`;

export const RightItem = styled.div`
  width: 50%;
  position: relative;
`;

export const ItemPhotoLeft = styled.div`
  margin-right: 50px;
  position: relative;
  padding-top:100%;
  background-image: ${({ imageUrlL }) => (imageUrlL ? `url(${imageUrlL})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
  margin-left:6rem;
`;

export const ItemPhotoRight = styled.div`
  padding-top: 80%;
  margin-left: 50px;
  margin-top: 40%;
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
  position: absolute;
  background: linear-gradient(90deg, #ffbed0 0%, #fcfcfc 100%);
  width: 70%;
  height: 80%;
  top: 10%;
  left: 0;
`;
export const Gradient2 = styled.div`
  position: absolute;
  background: linear-gradient(90deg, rgba(193,228,249,1) 0%, #f4f9ff 100%);
  width: 40%;
  height: 90%;
  top: 10%;
  left: 30%;
`;
export const LeftItem2 = styled.div`
  width: 40%;
  position: relative;
`;
export const RightItem2 = styled.div`
  width: 60%;
  position: relative;
`;
export const ItemPhotoLeft2 = styled.div`
  padding-top: 80%;
  margin-left: 50px;
  margin-top: 20%;
  position: relative;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
`;
export const ItemPhotoRight2 = styled.div`
  margin-left: 100px;
  position: relative;
  padding-top:60%;
  margin-top: 25%;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
`;
export const ItemsBottom = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 5rem;
`;