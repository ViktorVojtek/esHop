import React, { FC, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { Context } from '../../../../lib/state/Store';
import Wrapper from '../../../../shared/styles/components/Wrapper/Wrapper.style';
import CartContent from './components/CartContent';

const CartEmpty: () => JSX.Element = () => (
  <div className="mx-auto w-50">
    <h2 className="text-center">Nákupný košík je prázdny</h2>
    <p className="text-center">
      Let's go{' '}
      <Link href="/eshop">
        <a>check</a>
      </Link>{' '}
      our products.
    </p>
  </div>
);

const CartBodyComponent: FC = () => {
  const {
    state: { cart, giftCards },
    state,
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
      sum += item.price;
    });

    dispatch({ type: 'SET_TOTAL_SUM', payload: sum });
  }, [cart, giftCards]);

  return (
    <Wrapper>
      {cart.length > 0 || giftCards.length > 0 ? (
        <CartContent data={cart} giftCards={giftCards} />
      ) : (
        <CartEmpty />
      )}
    </Wrapper>
  );
};

export default CartBodyComponent;
