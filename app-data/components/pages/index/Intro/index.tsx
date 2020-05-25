import React, { FC, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Wrapper, Left, Right, H1, H3, H4 } from './styles';
import { LinkButton } from '../../../../shared/styles/global.style';
import CarouselProducts from './components/Carousel';
import CarouselTextItem from './components/CarouselTextItem';
import Services from './components/Services';

const Intro: FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Wrapper>
      <CarouselProducts setActiveItem={setActiveItem} />
      <Services />
    </Wrapper>
  );
};

export default Intro;
