import React, { useState } from 'react';
import SwiperCore, { Thumbs, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import styled from 'styled-components';
import { colors } from '../../../../../../shared/design';

const SwiperWrapper = styled.div`
  height: 500px;
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
  @media (max-width: 1200px) {
    height: 450px;
  }
  @media (max-width: 576px) {
    height: 300px;
  }
`;

const Chevron = styled.div`
  color: ${colors.primary};
  &:before {
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    display: inline-block;
    height: 26px;
    left: 8px;
    position: relative;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 26px;
    @media (max-width: 576px) {
      height: 16px;
      width: 16px;
    }
  }
  &:after {
    content: '';
  }
`;

const StyledArrowPrev = styled(Chevron)`
  left: 30px;
  &:before {
    left: 0.25em;
    transform: rotate(-135deg);
  }
  @media (max-width: 576px) {
    left: 15px;
  }
`;
const StyledArrowNext = styled(Chevron)`
  right: 30px;
  &:before {
    left: 0;
    transform: rotate(45deg);
  }
  @media (max-width: 576px) {
    right: 15px;
  }
`;

type ImageGallerySwiperProps = {
  items: any;
  thumbnails: any;
};

// install Swiper's Thumbs component
SwiperCore.use([Thumbs, Navigation]);

export const ImageGallerySwiper = (props: ImageGallerySwiperProps) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        tag={SwiperWrapper}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
      >
        {props.items}

        <StyledArrowPrev className="swiper-button-prev" />
        <StyledArrowNext className="swiper-button-next" />
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesVisibility
        watchSlidesProgress
        slidesPerView={3}
        spaceBetween={10}
        freeMode
      >
        {props.thumbnails}
      </Swiper>
      {/* It is also required to set watchSlidesVisibility and watchSlidesProgress props */}
    </>
  );
};
