import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import Link from 'next/link';
import { Button, colors, SecondaryButton } from '../../../../shared/design';
import { Container } from 'reactstrap';

SwiperCore.use([Autoplay, Pagination, Navigation]);

type WrapperProps = {
  img: string;
};

const ArrowHolder = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 80px;
  right: 15px;
  width: 100px;
  height: 100px;
`;

const BulletHolder = styled.div`
  position: absolute;
  z-index: 2;
  top: 80px;
  left: 15px;
  @media (max-width: 992px) {
    bottom: 26px;
    right: 15px;
    top: auto;
    left: auto;
  }
`;

const SwiperWrapper = styled.div``;

const Chevron = styled.div`
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &:before {
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    display: inline-block;
    height: 14px;
    position: relative;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 14px;
    color: ${colors.primary};
  }
  &:after {
    content: '';
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

const StyledArrowPrev = styled(Chevron)`
  position: absolute;
  right: 64px;
  left: auto;
  box-shadow: 3px 7px 20px 0px #00aeef61;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: scale(1.1);
  }
  &:before {
    left: 2px;
    transform: rotate(-135deg);
  }
`;
const StyledArrowNext = styled(Chevron)`
  position: absolute;
  right: 0px;
  box-shadow: 3px 7px 20px 0px #00aeef61;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: scale(1.1);
  }
  &:before {
    right: 2px;
    transform: rotate(45deg);
  }
`;

const Wrapper = styled.div<WrapperProps>`
  width: 100vw;
  min-height: 600px;
  background-image: ${({ img }) => (img ? `url('${img}')` : '')};
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 992px) {
    padding: 32px 0px 64px 0px;
  }
`;

const ContentImage = styled.img`
  cursor: pointer;
  width: 100%;
`;
const ContentImagesHolder = styled.div`
  position: relative;
  width: 50%;
  @media (max-width: 992px) {
    margin-bottom: 64px;
    width: 100%;
    max-width: 500px;
  }
`;

const ContentText = styled.div`
  width: 50%;
  max-width: 500px;
  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
  }
`;

const Heading = styled.h2`
  color: black;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Text = styled.p`
  color: black;
  line-height: 1.5rem;
  margin: 48px 0;
  @media (max-width: 992px) {
    margin: 32px 0;
  }
`;

const ButtonsHolder = styled.div`
  display: flex;
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const StyledButtonPrimary = styled(Button)`
  width: 100%;
  max-width: 210px;
  padding: 12px 24px;
  box-shadow: 3px 7px 20px 0px #00aeefb0;
  margin-right: 16px;
`;

const StyledButtonSecondary = styled(SecondaryButton)`
  width: 100%;
  max-width: 210px;
  padding: 12px 24px;
  box-shadow: none;
  background: none;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
  padding-left: 15px;
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const BulletContainer = styled(Container)`
  position: relative;
  @media (max-width: 992px) {
    position: absolute;
    bottom: 0;
  }
`;

const ArrowContainer = styled(Container)`
  position: relative;
  @media (max-width: 992px) {
    display: none;
  }
`;

const slide1 = (
  <SwiperSlide>
    <Wrapper img="/images/carousel_image1.png">
      <Container>
        <Content>
          <ContentText>
            <Heading>Zháňate darček na poslednú chvíľu?</Heading>
            <Text>
              <strong>
                Vyberte si spomedzi našich pobytov, procedúr či produktov.
              </strong>
              <br /> Vložte venovanie, vyberte motív a o zvyšok sa postaráme my.
            </Text>
            <ButtonsHolder>
              <Link href="/darcekove-poukazky">
                <StyledButtonPrimary>Vytvoriť poukážku</StyledButtonPrimary>
              </Link>
              <Link href="/eshop">
                <StyledButtonSecondary className="ml-4">
                  Nakupovať
                </StyledButtonSecondary>
              </Link>
            </ButtonsHolder>
          </ContentText>
          <ContentImagesHolder>
            <Link href="/darcekove-poukazky">
              <ContentImage src="/images/poukazky1.png" />
            </Link>
          </ContentImagesHolder>
        </Content>
      </Container>
    </Wrapper>
  </SwiperSlide>
);

const slide2 = (
  <SwiperSlide>
    <Wrapper img="/images/carousel_image1.png">
      <Container>
        <Content>
          <ContentText>
            <Heading>Odišli ste bez suveníru? Nezúfajte.</Heading>
            <Text>
              Vyberte si spomedzi niekoľkých príchutí našich kúpeľných oblátok a
              doneste si kúsok nás k Vám domov.
            </Text>
            <ButtonsHolder>
              <Link href="/darcekove-poukazky">
                <StyledButtonPrimary>Vytvoriť poukážku</StyledButtonPrimary>
              </Link>
              <Link href="/eshop">
                <StyledButtonSecondary className="ml-4">
                  Nakupovať
                </StyledButtonSecondary>
              </Link>
            </ButtonsHolder>
          </ContentText>
          <ContentImagesHolder>
            <Link href="/eshop">
              <ContentImage src="/images/products1.png" />
            </Link>
          </ContentImagesHolder>
        </Content>
      </Container>
    </Wrapper>
  </SwiperSlide>
);

export const Slider = () => {
  return (
    <>
      <BulletContainer>
        <BulletHolder className="custom-bullet-container"></BulletHolder>
      </BulletContainer>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        allowTouchMove={true}
        pagination={{ el: '.custom-bullet-container', clickable: true }}
        autoplay={{
          delay: 100000,
          disableOnInteraction: true,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
      >
        {slide2}
        {slide1}
      </Swiper>
      <ArrowContainer>
        <ArrowHolder>
          <StyledArrowPrev className="swiper-button-prev" />
          <StyledArrowNext className="swiper-button-next" />
        </ArrowHolder>
      </ArrowContainer>
    </>
  );
};
