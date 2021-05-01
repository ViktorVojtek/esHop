import React, {
  FC,
  ReactNode,
  useState,
  useContext,
  forwardRef,
  useEffect,
} from 'react';
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
import { useRouter } from 'next/router';

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
const LinkItem: FC<ILinkItem> = ({ href, title, className = '' }) => (
  <NavItem>
    <Link href={href}>
      <NavLink
        className={`letter-spacing-1 nav-link-main ${className}`}
        href={href}
      >
        {title}
      </NavLink>
    </Link>
  </NavItem>
);
const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setScrolled] = React.useState(false);
  const { state } = useContext(Context);
  const router = useRouter();

  const { cart, giftCards } = state;
  const toggle: () => void = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Wrapper id="navigation">
        <Navbar
          color="light"
          light
          fixed="top"
          expand="lg"
          className={isScrolled ? 'navbar-main active' : 'navbar-main'}
        >
          <Link href="/">
            <CustomNavbarBrand href="/">
              <Logo src="/icons/logo_CKSeshop.svg" alt="Červený kláštor" />
            </CustomNavbarBrand>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <LinkItem href="/" title="Domov" />
              <LinkItem
                href="/eshop"
                title="Obchod"
                className={
                  router.pathname.includes('eshop') && 'nav-link-main-active'
                }
              />
              <LinkItem
                href="/darcekove-poukazky"
                title="Darčekové poukážky"
                className={
                  router.pathname.includes('darcekove') &&
                  'nav-link-main-active'
                }
              />
              <LinkItem
                href="/kontakt"
                title="Kontakt"
                className={
                  router.pathname.includes('kontakt') && 'nav-link-main-active'
                }
              />
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
              <Logo src="/icons/logo_CKSeshop.svg" alt="Červený kláštor" />
            </CustomNavbarBrand>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <CartWrapper>
            <Link href="/eshop/cart">
              <a>
                <CartIcon /> <span>{cart.length + giftCards.length}</span>
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
