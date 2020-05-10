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

const CartIcon = styled(ShoppingCartOutline)`
  color: red;
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
    <Wrapper id="navigation">
      <Navbar color="light" light expand="md">
        <Link href="/">
          <CustomNavbarBrand href="/">
            <Logo src="/images/logo.png" alt="Červený kláštor" />
          </CustomNavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <LinkItem href="/" title="Domov" />
            <LinkItem href="/eshop" title="Produkty" />
            <LinkItem href="/eshop" title="Služby" />
            <LinkItem href="/" title="O nás" />
            <LinkItem href="/" title="FAQ" />
            <CartWrapper>
              <Link href="/eshop/cart">
                <a>
                  <CartIcon width={30} height={30} /> <span>{cart.length}</span>
                </a>
              </Link>
            </CartWrapper>
          </Nav>
        </Collapse>
      </Navbar>{' '}
    </Wrapper>
  );
};

export default Navigation;
