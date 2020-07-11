import React, { FC, useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AsideCart from '../../../components/pages/eshop/components/AsideCart';
import { ShoppingCartOutline } from 'styled-icons/evaicons-outline';
import { CartWrapper } from '../Navigation/Site/styles';
import Link from 'next/link';
import { Context } from '../../../lib/state/Store';

const CartIcon = styled(ShoppingCartOutline)`
  color: red;
  width: 36px;
`;

const fadeIn = keyframes`
  0%{
    display: block;
    opacity: 0;
  }
  50%{
    opacity: .5
  }
  100%{
    opacity: 1
  }
`;

const fadeOut = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: .5
  }
  100%{
    opacity: 0
    display: none;
  }
`;

const ShopingCart = styled.div<ShoppingCartType>`
  margin: 20px 0;
  right: 0rem;
  background: white;
  width: 320px;
  position: absolute;
  border-radius: 3px;
  border: 1px solid #00aeef;
  padding: 20px;

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.4s linear;
  transition: opacity 1s linear;
  &:after {
    bottom: 100%;
    left: 89%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #00aeef;
    border-width: 12px;
    margin-left: -12px;
  }
`;

type ShoppingCartType = {
  isOpen: boolean;
};

type CartPopoverType = {
  target: string;
};

const CartPopover: FC<CartPopoverType> = ({ target }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useContext(Context);
  const { cart } = state;

  return (
    <>
      <CartWrapper onMouseEnter={() => setIsOpen(true)}>
        <Link href="/eshop/cart">
          <a>
            <CartIcon /> <span>{cart.length}</span>
          </a>
        </Link>
        <ShopingCart isOpen={isOpen} onMouseLeave={() => setIsOpen(false)}>
          <AsideCart />
        </ShopingCart>
      </CartWrapper>
    </>
  );
};

export default CartPopover;
