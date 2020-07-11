import React, { FC, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { Context } from '../../../../../lib/state/Store';
import AsideCartContent from './components/AsideCartContent';

const CartEmpty: () => JSX.Element = () => (
  <div className="w-100">
    <p className="text-center">Nákupný košík je prázdny!</p>
  </div>
);

const CartAside: FC = () => {
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
    <div>
      {cart.length > 0 ? <AsideCartContent data={cart} /> : <CartEmpty />}
    </div>
  );
};

export default CartAside;
