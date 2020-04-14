import React from 'react';
import {
  Wrapper, H2, Text, LeftItem, RightItem, Items,
  ItemPhotoLeft, ItemPhotoRight, TextArea, ProductHeader, Gradient, Gradient2, TextLeft,
} from './styles';

const ProductItem = ({
  title, about, headerLeft, headerRight, textLeft, textRight, imageUrlL, imageUrlR,
  width, height, top, right, gradient1, 
}) => (
  <Wrapper>
    <H2>{title}</H2>
    <Text>{about}</Text>
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