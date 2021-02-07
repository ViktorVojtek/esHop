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
import { GiftCard } from '../../../../../../../shared/types/Store.types';
import AsideCartGiftCards from '../AsideCartGiftCards';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';

interface ICartContent {
  data: any[];
  giftCards: GiftCard[];
  cartTotalSum: number;
}

const AsideCartContent: FC<ICartContent> = ({
  data,
  cartTotalSum,
  giftCards,
}) => {
  const { state } = useContext(Context);
  const { cart } = state;
  return (
    <>
      <Total>
        <TotalItem>
          <TotalText light>Počet položiek:</TotalText>
          <TotalText className="ml-1">
            {cart.length + giftCards.length}
          </TotalText>
        </TotalItem>
        <TotalItem>
          <TotalText light>Spolu:</TotalText>
          <TotalText className="ml-1">{`${formatPrice(
            cartTotalSum
          )} €`}</TotalText>
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
      {giftCards.map((item: GiftCard, i: number) => (
        <AsideCartGiftCards
          id={i}
          giftCardTitle={item.giftCardTitle}
          giftCardImageUrl={item.giftCardImageUrl}
          totalPrice={item.totalPrice}
          text={item.text}
          priceValue={item.priceValue}
          services={item.services}
          key={i}
        />
      ))}
      <Link href="/eshop/cart">
        <ButtonLink>Do pokladne</ButtonLink>
      </Link>
    </>
  );
};

export default AsideCartContent;
