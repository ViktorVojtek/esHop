import React, { FC, useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AsideCart from '../../../components/pages/eshop/components/AsideCart';
import { ShoppingCartOutline } from 'styled-icons/evaicons-outline';
import { CartWrapper } from '../Navigation/Site/styles';
import Link from 'next/link';
import { Context } from '../../../lib/state/Store';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const CartIcon = styled(ShoppingBasketIcon)`
  color: red;
  width: 34px !important;
  height: 34px !important;
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
  margin: 0px 0;
  right: 0rem;
  background: white;
  width: 400px;
  position: absolute;
  border-radius: 3px;
  border: 1px solid #00aeef;
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
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
  const { cart, giftCards } = state;

  return (
    <>
      <CartWrapper>
        <Link href="/eshop/cart">
          <a>
            <CartIcon /> <span>{cart.length + giftCards.length}</span>
          </a>
        </Link>
      </CartWrapper>
    </>
  );
};

export default CartPopover;
