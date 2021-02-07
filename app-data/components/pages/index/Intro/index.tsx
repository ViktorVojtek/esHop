import React, { FC, useState } from 'react';
import { Wrapper } from './styles';
import CarouselProducts from './components/Carousel';
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
