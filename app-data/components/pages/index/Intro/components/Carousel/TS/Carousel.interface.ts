import { Dispatch, SetStateAction } from 'react';

export interface ICarouselProduct {
  setActiveItem: Dispatch<SetStateAction<number>>;
}

export interface ICarouselItem {
  src: string;
  altText: string;
}
