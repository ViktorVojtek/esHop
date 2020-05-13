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
    state: { cart, cartTotalSum },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    let sum: number = 0;

    cart.forEach((item: any) => {
      sum += item.variant.count * item.variant.price.value;
    });

    dispatch({ type: 'SET_TOTAL_SUM', payload: sum });
  }, [cart]);

  return (
    <Wrapper>
      <Container>
        {cart.length > 0 ? <CartContent data={cart} /> : <CartEmpty />}
      </Container>
    </Wrapper>
  );
};

export default CartBodyComponent;
