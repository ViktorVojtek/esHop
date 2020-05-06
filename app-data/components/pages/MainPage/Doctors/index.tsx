import React, { FC, useState } from 'react';

import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';

import {
  Wrapper,
  P,
  Content,
  Photo,
  Name,
  Position,
} from './style/doctors.style';

import { IDoctorItem } from './TS/Doctors.interface';

const items: IDoctorItem[] = [
  {
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1550s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    caption: 'Slide 1',
    photo: '/images/index/doctor.jpg',
    name: 'Janko Hrasko',
    position: 'Doktor',
  },
  {
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1550s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    caption: 'Slide 2',
    photo: '/images/index/doctor.jpg',
    name: 'John Doe',
    position: 'Maser',
  },
  {
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1550s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    caption: 'Slide 3',
    photo: '/images/index/doctor.jpg',
    name: 'Esteban Hrasko',
    position: 'Barman',
  },
];

const Doctors: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next: () => void = () => {
    if (animating) return;

    const nextIndex: number =
      activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous: () => void = () => {
    if (animating) return;

    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex: (nexIndex: number) => void = (newIndex) => {
    if (animating) return;

    setActiveIndex(newIndex);
  };
  const slides: JSX.Element[] = items.map(
    ({ caption, name, text, photo, position }) => (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={caption}
      >
        <Content>
          <P>{text}</P>
          <Photo src={photo} alt={caption} />
          <Name>{name}</Name>
          <Position>{position}</Position>
        </Content>
      </CarouselItem>
    )
  );

  return (
    <Wrapper>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
      </Carousel>
    </Wrapper>
  );
};

export default Doctors;
