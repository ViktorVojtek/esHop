import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Link from 'next/link';
import { Button } from '../../../../shared/design';

SwiperCore.use([Autoplay]);

type WrapperProps = {
  img: string;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100vw;
  height: 100vh;
  min-height: 400px;
  background-image: ${({ img }) => (img ? `url('${img}')` : '')};
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: calc(100% - 100px);
  max-width: 1400px;
  padding: 0 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 992px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
`;

const ContentImage = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
  transition: opacity 0.5s ease-out;
  &:hover {
    opacity: 0;
  }
`;
const ContentImage2 = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
  transition: opacity 0.5s ease-out;
`;

const ContentImageFade = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
`;
const ContentImagesHolder = styled.div`
  position: relative;
  width: 50%;
  max-width: 800px;
  height: 270px;
  @media (max-width: 1350px) {
    height: 240px;
  }
  @media (max-width: 1200px) {
    height: 210px;
  }
  @media (max-width: 1050px) {
    height: 160px;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

const ContentText = styled.div`
  width: 50%;
  max-width: 500px;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const Heading = styled.h2`
  color: white;
`;

const Text = styled.p`
  color: white;
  line-height: 1.5rem;
  margin: 24px 0;
  @media (max-width: 992px) {
    margin: 16px 0;
  }
`;

const ButtonsHolder = styled.div`
  display: flex;
  @media (max-width: 576px) {
    display: block;
  }
`;

const slide1 = (
  <SwiperSlide>
    <Wrapper img="/images/slide1.jpg">
      <ContentWrapper>
        <ContentText>
          <Heading>Zháňate valentínsky darček na poslednú chvíľu?</Heading>
          <Text>
            Vyberte si spomedzi našich pobytov, procedúr či produktov. Vložte
            venovanie, vyberte motív a o zvyšok sa postaráme my.
          </Text>
          <ButtonsHolder style={{ display: 'flex' }}>
            <Link href="/darcekove-poukazky">
              <Button>Vytvoriť poukážku</Button>
            </Link>
            <Link href="/eshop">
              <Button className="ml-4">Nakupovať</Button>
            </Link>
          </ButtonsHolder>
        </ContentText>
        <ContentImagesHolder>
          <ContentImageFade src="/images/poukazky2.png" />
          <ContentImage src="/images/poukazky1.png" />
        </ContentImagesHolder>
      </ContentWrapper>
    </Wrapper>
  </SwiperSlide>
);

const slide2 = (
  <SwiperSlide>
    <Wrapper img="/images/slide2.jpg">
      <ContentWrapper>
        <ContentText>
          <Heading>Odišli ste bez suveníra? Nezúfajte.</Heading>
          <Text>
            Vyberte si spomedzi niekoľkých príchutí našich kúpeľných oblátok a
            doneste si kúsok nás k Vám domov.
          </Text>
          <div style={{ display: 'flex' }}>
            <Link href="/darcekove-poukazky">
              <Button>Vytvoriť poukážku</Button>
            </Link>
            <Link href="/eshop">
              <Button className="ml-4">Nakupovať</Button>
            </Link>
          </div>
        </ContentText>
        <ContentImagesHolder>
          <ContentImage2 src="/images/products1.png" />
        </ContentImagesHolder>
      </ContentWrapper>
    </Wrapper>
  </SwiperSlide>
);

export const Slider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      allowTouchMove={false}
      autoplay={{
        delay: 10000,
        disableOnInteraction: true,
      }}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
    >
      {slide1}
      {slide2}
    </Swiper>
  );
};
