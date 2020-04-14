import React from 'react';
import Link from 'next/link';

import { Wrapper, NavItem, NavHolder } from './style/navigationBottom.style';

const NavigationBottom = () => (
  <Wrapper>
    <NavHolder>
      <Link href="/">
        <NavItem>DOMOV</NavItem>
      </Link>
      <Link href="/o-nas">
        <NavItem>O nás</NavItem>
      </Link>
      <Link href="/eshop/products">
        <NavItem>produkty</NavItem>
      </Link>
      <Link href="/eshop/services">
        <NavItem>Služby</NavItem>
      </Link>
      <Link href="/eshop/stays">
        <NavItem>Pobyty</NavItem>
      </Link>
      <Link href="/faq">
        <NavItem>Faq</NavItem>
      </Link>
    </NavHolder>
  </Wrapper>
);

export default NavigationBottom;