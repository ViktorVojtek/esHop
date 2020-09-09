import React, { FC } from 'react';
import { Number, Header, Text } from './styles';

interface ICarouselTextItem {
  number: string;
  header: string;
  text: string;
}
const CarouselTextItem: FC<ICarouselTextItem> = ({ number, header, text }) => (
  <>
    <Number>{number}</Number>
    <Header>{header}</Header>
    <Text>{text}</Text>
  </>
);

export default CarouselTextItem;
