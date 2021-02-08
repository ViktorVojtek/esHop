import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { ProductImage } from '../../../../../../shared/types/Store.types';
import { ImageGallerySwiper } from '../ImageGallerySwiper';
import styled from 'styled-components';

type ItemProps = {
  url: string;
};

export const ImageItem = styled.div<ItemProps>`
  height: 500px;
  width: 100%;
  background-image: ${({ url }) => (url ? `url('${url}')` : '')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 1200px) {
    height: 450px;
  }
  @media (max-width: 576px) {
    height: 300px;
  }
`;

const Img = styled.div<ItemProps>`
  height: 100px;
  width: 100%;
  background-image: ${({ url }) => (url ? `url('${url}')` : '')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 576px) {
    height: 75px;
  }
`;

const ImgWrapper = styled.div`
  height: 100px;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-out;
  @media (max-width: 576px) {
    height: 75px;
  }
`;

type ImageGalleryProps = {
  images: ProductImage[];
};

export const ImageGallery = (props: ImageGalleryProps) => {
  const { images } = props;

  const elements = images.map((image) => (
    <SwiperSlide key={image.title}>
      <ImageItem url={image.path} />
    </SwiperSlide>
  ));

  const thumbnails = images.map((image) => (
    <SwiperSlide key={image.title}>
      <ImgWrapper>
        <Img url={image.path} />
      </ImgWrapper>
    </SwiperSlide>
  ));

  return <ImageGallerySwiper items={elements} thumbnails={thumbnails} />;
};
