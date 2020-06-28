import React, { FC } from 'react';
import AsideCartProduct from '../AsideCartProduct';

interface ICartContent {
  data: any[];
}

const AsideCartContent: FC<ICartContent> = ({ data }) => (
  <>
    {data.map((item: any, i: number) => (
      <AsideCartProduct
        id={item.id}
        variantTitle={item.variant.title}
        count={item.variant.count}
        image={
          item.variant && item.variant.images ? item.variant.images[0] : ''
        }
        key={`${item.id}-${i}`}
      />
    ))}
  </>
);

export default AsideCartContent;
