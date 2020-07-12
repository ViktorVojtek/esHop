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
  cartTotalSum: number;
}

const AsideCartContent: FC<ICartContent> = ({ data, cartTotalSum }) => {
  const { state } = useContext(Context);
  const { cart } = state;
  return (
    <>
      <Total>
        <TotalItem>
          <TotalText light>Počet položiek:</TotalText>
          <TotalText className="ml-1">{cart.length}</TotalText>
        </TotalItem>
        <TotalItem>
          <TotalText light>Spolu:</TotalText>
          <TotalText className="ml-1">{`${cartTotalSum},- €`}</TotalText>
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
