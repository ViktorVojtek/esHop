import React, { FC, ReactNode, useState, useContext, forwardRef } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import styled from 'styled-components';
import { ShoppingCartOutline } from 'styled-icons/evaicons-outline';
import { CartWrapper, Logo, Wrapper, Login } from './styles';
import { Context } from '../../../../lib/state/Store';

import { ILinkItem } from './TS/Navigation.interface';
import MobileMenuEshop from '../../../components/MobileMenuEshop';
import LoginRegisterModal from '../../../../shared/components/LoginRegisterModal';
import CartPopover from '../../CartPopover';

const CartIcon = styled(ShoppingCartOutline)`
  color: red;
  width: 36px;
`;

type FWRCBrand = {
  href: string;
  children: ReactNode;
};

const CustomNavbarBrand = forwardRef(({ href, children }: FWRCBrand, ref) => (
  <NavbarBrand href={href}>{children}</NavbarBrand>
));
const LinkItem: FC<ILinkItem> = ({ href, title }) => (
  <NavItem>
    <Link href={href}>
      <NavLink
        className="text-uppercase letter-spacing-1 nav-link-main"
        href={href}
      >
        {title}
      </NavLink>
    </Link>
  </NavItem>
);
const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const { state } = useContext(Context);

  const { cart } = state;
  const toggle: () => void = () => setIsOpen(!isOpen);

  return (
    <>
      <Wrapper id="navigation">
        <Navbar color="light" light fixed="top" expand="md">
          <Link href="/">
            <CustomNavbarBrand href="/">
              <Logo src="/images/logo.png" alt="Červený kláštor" />
            </CustomNavbarBrand>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <LinkItem href="/" title="Domov" />
              <LinkItem href="/eshop" title="Obchod" />
              <LinkItem href="/darcekove-poukazky" title="Darčekové poukážky" />
              <LinkItem href="/kontakt" title="Kontakt" />
              {/*<CartWrapper id="cartLink">
                <Link href="/eshop/cart">
                  <a>
                    <CartIcon /> <span>{cart.length}</span>
                  </a>
                </Link>
              </CartWrapper>*/}
              <CartPopover target="cartIcon" />
              {/*<Login onClick={() => setLoginModal(true)} />*/}
            </Nav>
          </Collapse>
        </Navbar>{' '}
      </Wrapper>
      <Wrapper id="mobileNavigation">
        <MobileMenuEshop />
        <Link href="/">
          <CustomNavbarBrand href="/">
            <Logo src="/images/logo.png" alt="Červený kláštor" />
          </CustomNavbarBrand>
        </Link>
        <CartWrapper>
          <Link href="/eshop/cart">
            <a>
              <CartIcon /> <span>{cart.length}</span>
            </a>
          </Link>
        </CartWrapper>
      </Wrapper>
      <LoginRegisterModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
      />
    </>
  );
};

export default Navigation;
