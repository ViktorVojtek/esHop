import React, { FC } from 'react';
import {
  Wrapper,
  H2,
  Text,
  LeftItem,
  RightItem,
  Items,
  ItemPhotoLeft,
  ItemPhotoRight,
  TextArea,
  ProductHeader,
  Gradient,
  TextLeft,
  Text2,
} from './styles';

import { IProductItem } from './TS/ProductItemMP.interface';

const ProductItem: FC<IProductItem> = ({
  title,
  about,
  headerLeft,
  headerRight,
  textLeft,
  textRight,
  imageUrlL,
  imageUrlR,
  width,
  height,
  top,
  right,
  gradient1,
}) => (
  <Wrapper>
    <H2>{title}</H2>
    <Text2>{about}</Text2>
    <Items>
      <Gradient
        gradient1={gradient1}
        width={width}
        height={height}
        top={top}
        right={right}
      />
      <LeftItem>
        <ItemPhotoLeft imageUrlL={imageUrlL}>
          <TextArea className="card-item">
            <ProductHeader>{headerLeft}</ProductHeader>
            <TextLeft>{textLeft}</TextLeft>
          </TextArea>
        </ItemPhotoLeft>
      </LeftItem>
      <RightItem>
        <ItemPhotoRight imageUrlR={imageUrlR}>
          <TextArea className="card-item">
            <ProductHeader>{headerRight}</ProductHeader>
            <Text>{textRight}</Text>
          </TextArea>
        </ItemPhotoRight>
      </RightItem>
    </Items>
  </Wrapper>
);

export default ProductItem;
