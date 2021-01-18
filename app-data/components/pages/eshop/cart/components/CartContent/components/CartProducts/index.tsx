import React, { FC } from 'react';
import GiftCardTableRow from '../GiftCardTable';
import { TH, TR, H4 } from '../../../../styles/cart.style';
import { Row, Table } from 'reactstrap';
import { GiftCard } from '../../../../../../../../shared/types/Store.types';
import Coupon from '../Coupon';
import CartProduct from '../CartProductTable';

type ICartContent = {
  data: any;
  giftCards: any;
  loyalityProduct: any;
};

const CartProducts: FC<ICartContent> = ({
  data,
  giftCards,
  loyalityProduct,
}) => {
  return (
    <>
      <Row>
        <Coupon />
      </Row>
      {data.length > 0 && (
        <>
          {data.map((item: any, i: number) => (
            <CartProduct
              id={item.id}
              discount={item.variant.discount}
              variantTitle={item.variant.title}
              count={item.variant.count}
              image={
                item.variant && item.variant.images
                  ? item.variant.images[0]
                  : ''
              }
              key={`${item.id}-${i}`}
            />
          ))}
        </>
      )}{' '}
      {giftCards.length > 0 && (
        <>
          {giftCards.map((item: GiftCard, i: number) => (
            <GiftCardTableRow
              cardColor={item.cardColor}
              totalPrice={item.totalPrice}
              text={item.text}
              services={item.services}
              priceValue={item.priceValue}
              id={i}
              key={i}
            />
          ))}
        </>
      )}
    </>
  );
};

export default CartProducts;
