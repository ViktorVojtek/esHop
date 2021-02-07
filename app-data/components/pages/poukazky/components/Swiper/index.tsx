import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';
import { getSlidesPerView } from '../../../../../shared/helpers/getSlidesPerView';
import useViewport from '../../../../../shared/helpers/useViewport';

SwiperCore.use([Navigation, Pagination]);

type SwiperCarouselProps = {
  customLoop?: boolean;
  customLoopFillGroupWithBlank?: boolean;
  customNavigation?: boolean;
  productsCount?: number;
  children: any;
};

const SwiperWrapper = styled.div`
  height: 80vh;
  max-height: 412px;
  margin-bottom: 24px;
  overflow: hidden;
  width: calc(100% - 40px);
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Chevron = styled.div`
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
  }
  &:after {
    content: '';
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

const StyledArrowPrev = styled(Chevron)`
  left: -10px;
  &:before {
    left: 0.25em;
    transform: rotate(-135deg);
  }
`;
const StyledArrowNext = styled(Chevron)`
  right: -10px;
  &:before {
    left: 0;
    transform: rotate(45deg);
  }
`;

const SwiperCarousel = (props: SwiperCarouselProps) => {
  const {
    customLoop = true,
    customLoopFillGroupWithBlank = true,
    customNavigation = true,
  } = props;
  const { width } = useViewport();

  const slidesCount = getSlidesPerView(width);
  return (
    <>
      <Swiper
        observer
        tag={SwiperWrapper}
        slidesPerView={slidesCount}
        spaceBetween={30}
        direction={slidesCount > 1 ? 'horizontal' : 'horizontal'}
        pagination={{ clickable: true }}
        centeredSlides
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onInit={(swiper) => {
          swiper.slideTo(Math.round(swiper.slides.length / 2) - 1);
        }}
        onUpdate={(swiper) => {
          swiper.slideTo(Math.round(swiper.slides.length / 2) - 1);
        }}
      >
        {props.children}
      </Swiper>
      <StyledArrowPrev className="swiper-button-prev" />
      <StyledArrowNext className="swiper-button-next" />
    </>
  );
};

export default SwiperCarousel;
