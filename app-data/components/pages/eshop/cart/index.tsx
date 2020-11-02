import React, { FC, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { Context } from '../../../../lib/state/Store';
import CartContent from './components/CartContent';
import { CartProduct } from '../../../../shared/types/Store.types';
import { ButtonLink, EmptyCart, Wrapper } from './styles/cart.style';

const CartEmpty: () => JSX.Element = () => (
  <Wrapper>
    <Container className="text-center">
      <h2 className="text-center font-weight-bold mt-4 mb-4">
        Nákupný košík je prázdny
      </h2>
      <EmptyCart />
      <h4 className="text-center font-weight-bold mt-4 mb-4">
        Vyzerá to, že ste si nepridali žiaden produkt do košíka.
      </h4>
      <Link href="/eshop">
        <ButtonLink>Nakupovať</ButtonLink>
      </Link>{' '}
    </Container>
  </Wrapper>
);

const CartBodyComponent: FC = () => {
  const {
    state: { cart, giftCards },
    state,
    dispatch,
  } = useContext(Context);

  function setAllowEnvelope() {
    let setAllowEnvelope = cart.every(function (item: CartProduct) {
      return item.isEnvelopeSize === true;
    });
    dispatch({
      type: 'ALLOW_ENVELOPE',
      payload: setAllowEnvelope,
    });
  }

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
    setAllowEnvelope();
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
