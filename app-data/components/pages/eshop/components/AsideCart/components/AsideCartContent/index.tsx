import React, { FC, useContext } from 'react';
import AsideCartProduct from '../AsideCartProduct';
import {
  ButtonLink,
  Total,
  TotalItem,
  TotalText,
} from '../AsideCartProduct/styles/asideCartProductStyle';
import Link from 'next/link';
import { Context } from '../../../../../../../lib/state/Store';

interface ICartContent {
  data: any[];
}

const AsideCartContent: FC<ICartContent> = ({ data }) => {
  const { state } = useContext(Context);
  const { cart } = state;

  let sum: number = 0;

  cart.forEach((item: any) => {
    if (item.variant.discount && item.variant.discount > 0) {
      sum +=
        item.variant.count *
        (item.variant.price.value -
          item.variant.price.value * (item.variant.discount / 100));
    } else {
      sum += item.variant.count * item.variant.price.value;
    }
  });
  return (
    <>
      <Total>
        <TotalItem>
          <TotalText light>Počet položiek:</TotalText>
          <TotalText className="ml-1">{cart.length}</TotalText>
        </TotalItem>
        <TotalItem>
          <TotalText light>Spolu:</TotalText>
          <TotalText className="ml-1">{`${
            Math.round(sum * 100) / 100
          } €`}</TotalText>
        </TotalItem>
      </Total>
      {data.map((item: any, i: number) => (
        <AsideCartProduct
          id={item.id}
          variantTitle={item.variant.title}
          count={item.variant.count}
          discount={item.variant.discount}
          image={
            item.variant && item.variant.images ? item.variant.images[0] : ''
          }
          key={`${item.id}-${i}`}
        />
      ))}
      <Link href="/eshop/cart">
        <ButtonLink>Do pokladne</ButtonLink>
      </Link>
    </>
  );
};

export default AsideCartContent;
