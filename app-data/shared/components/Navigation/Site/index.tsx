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
import { CartWrapper, Logo, Wrapper } from './styles';
import { Context } from '../../../../lib/state/Store';

import { ILinkItem } from './TS/Navigation.interface';
import MobileMenuEshop from '../../../components/MobileMenuEshop';
import CartPopover from '../../CartPopover';
import CustomerMenu from '../../CustomerMenu';

const CartIcon = styled(ShoppingCartOutline)`
  color: red;
  width: 36px;
  @media (max-width: 576px) {
    width: 26px;
  }
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
  const { state } = useContext(Context);

  const { cart } = state;
  const toggle: () => void = () => setIsOpen(!isOpen);

  return (
    <>
      <Wrapper id="navigation">
        <Navbar color="light" light fixed="top" expand="lg">
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
              <CartPopover target="cartIcon" />
              <CustomerMenu />
            </Nav>
          </Collapse>
        </Navbar>{' '}
      </Wrapper>
      <Wrapper id="mobileNavigation">
        <div style={{ display: 'flex' }}>
          <MobileMenuEshop />
          <Link href="/">
            <CustomNavbarBrand href="/">
              <Logo src="/images/logo.png" alt="Červený kláštor" />
            </CustomNavbarBrand>
          </Link>
        </div>
        <div className="d-flex">
          <CartWrapper>
            <Link href="/eshop/cart">
              <a>
                <CartIcon /> <span>{cart.length}</span>
              </a>
            </Link>
          </CartWrapper>
          <CustomerMenu />
        </div>
      </Wrapper>
    </>
  );
};

export default Navigation;
