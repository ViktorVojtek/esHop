import React from 'react';
import { Number, Header, Text } from './styles';

const CarouselTextItem = ( { number, header, text } ) => (
  <div>
    <Number>{number}</Number>
    <Header>{header}</Header>
    <Text>{text}</Text>
  </div>
);

export default CarouselTextItem;