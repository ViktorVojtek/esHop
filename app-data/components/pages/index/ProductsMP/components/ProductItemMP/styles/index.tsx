import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 6rem;

  @media (max-width: 1550px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 992px) {
    margin-top: 4rem;
  }
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
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

  @media (max-width: 1440px) {
    width: 350px;
  }
  @media (max-width: 1200px) {
    width: 300px;
    font-size: 0.75rem;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Text2 = styled.p`
  font-size: 1rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  width: 400px;
  margin-top: 1rem;
  letter-spacing: 1px;

  @media (max-width: 1440px) {
    width: 350px;
  }

  @media (max-width: 1200px) {
    width: 300px;
    font-size: 0.75rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;

export const TextLeft = styled.p`
  font-size: 0.8rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  width: 400px;
  margin-top: 1rem;
  letter-spacing: 1px;

  @media (max-width: 1200px) {
    width: 360px;
    font-size: 0.75rem;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Items = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const LeftItem = styled.div`
  width: 60%;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const RightItem = styled.div`
  width: 40%;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

interface IPhotoLeftItem {
  imageUrlL?: string;
}

export const ItemPhotoLeft = styled.div<IPhotoLeftItem>`
  margin-right: 50px;
  position: relative;
  padding-top: 60%;
  background-image: ${({ imageUrlL }) =>
    imageUrlL ? `url(${imageUrlL})` : '0'};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
  @media(max-width: 768px){
    margin-right: 0px;
  }
  @media (max-width: 576px) {
    padding-top: 60%;
  }
`;

interface IPhotoRightItem {
  imageUrlR?: string;
}
export const ItemPhotoRight = styled.div<IPhotoRightItem>`
  padding-top: 100%;
  margin-left: 50px;
  margin-top: 220px;
  position: relative;
  background-image: ${({ imageUrlR }) =>
    imageUrlR ? `url(${imageUrlR})` : '0'};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
  @media (max-width: 1200px) {
    margin-left: 0px;
  }
  @media (max-width: 992px) {
    padding-top: 60%;
    margin-top: 200px;
  }
  @media (max-width: 576px) {
    padding-top: 60%;
    margin-top: 40px;
    background-position: 0px -100px;
  }
`;

export const TextArea = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0px;
  padding: 3rem;
  margin-left: 50%;
  transform: translate(-50%, 50%);
  border-radius: 4px;
  @media (max-width: 1550px) {
    padding: 2rem;
  }
  @media (max-width: 576px) {
    position: relative;
    margin-left: 0;
    transform: none;
    padding: 2rem .5rem;
  }
`;

export const ProductHeader = styled.h4``;

interface IGradient {
  gradient1?: boolean;
  width?: string;
  height?: string;
  top?: string;
  right?: string;
}

export const Gradient = styled.div<IGradient>`
  display: ${({ gradient1 }) => (gradient1 ? 'block' : 'none')};
  position: absolute;
  background: linear-gradient(90deg, rgba(193, 228, 249, 1) 0%, #f4f9ff 100%);
  width: ${({ width }) => (width ? `${width}%` : '0')};
  height: ${({ height }) => (height ? `${height}%` : '0')};
  top: ${({ top }) => (top ? `${top}%` : '0')};
  right: ${({ right }) => (right ? `${right}px` : '0')};
`;
