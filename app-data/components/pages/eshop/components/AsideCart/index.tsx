import React, { FC, useContext, useEffect } from 'react';

import { Context } from '../../../../../lib/state/Store';
import AsideCartContent from './components/AsideCartContent';

const CartEmpty: () => JSX.Element = () => (
  <div className="w-100">
    <p className="text-center">Nákupný košík je prázdny!</p>
  </div>
);

const CartAside: FC = () => {
  const {
    state: { cart, cartTotalSum, giftCards, loyalityProduct, coupon },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
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

    giftCards.forEach((item: any) => {
      sum += item.totalPrice;
    });

    if (loyalityProduct && loyalityProduct.isDiscount) {
      sum = sum - sum * (loyalityProduct.discount / 100);
    }
    if (coupon && coupon.value) {
      sum = sum - sum * (coupon.value / 100);
    }

    dispatch({ type: 'SET_TOTAL_SUM', payload: sum });
  }, [cart, giftCards, coupon, loyalityProduct]);

  return (
    <div>
      {cart.length > 0 || giftCards.length > 0 ? (
        <AsideCartContent
          data={cart}
          giftCards={giftCards}
          cartTotalSum={cartTotalSum}
        />
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartAside;
