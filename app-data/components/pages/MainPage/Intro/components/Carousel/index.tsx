import React, { FC, useState } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

import { ICarouselProduct, ICarouselItem } from './TS/Carousel.interface';

const items: ICarouselItem[] = [
  {
    src: '/images/sluzby.png',
    altText: 'Produkty',
    caption: 'Produkty caption',
  },
  {
    src: '/images/sluzby.png',
    altText: 'Sluzby',
    caption: 'Sluzby caption',
  },
  {
    src: '/images/sluzby.png',
    altText: 'Pobyty',
    caption: 'Pobyty',
  },
];

const CarouselProducts: FC<ICarouselProduct> = ({ setActiveItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next: () => void = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    setActiveItem(nextIndex);
  };

  const previous: () => void = () => {
    if (animating) return;

    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;

    setActiveIndex(nextIndex);
    setActiveItem(nextIndex);
  };

  const slides: JSX.Element[] = items.map(({ altText, src }) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={altText}
    >
      <img className="carousel-image" src={src} alt={altText} />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={5000}
    >
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default CarouselProducts;
