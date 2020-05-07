import React, { FC, ReactNode, useContext } from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { Context } from '../../../../lib/state/Store';
import Wrapper from '../../../../shared/styles/components/Wrapper/Wrapper.style';

interface ICartBodyProps {
  children?: ReactNode;
}

const CartEmpty: () => JSX.Element = () => (
  <div className="mx-auto w-50">
    <h2 className="text-center">Shopping cart is empty</h2>
    <p className="text-center">
      Let's go{' '}
      <Link href="/eshop">
        <a>check</a>
      </Link>{' '}
      our products.
    </p>
  </div>
);
const CartBodyComponent: FC<ICartBodyProps> = ({ children }) => {
  const { state, dispatch } = useContext(Context);
  const { cart } = state;

  console.log(cart);

  return (
    <Wrapper>
      <Container>
        {cart.length > 0 ? (
          <>
            <h2>This is cart page</h2>
            <p>Here you will see items added to cart.</p>
          </>
        ) : (
          <CartEmpty />
        )}
      </Container>
    </Wrapper>
  );
};

export default CartBodyComponent;
