import React, { FC } from 'react';
import Link from 'next/link';

import { ILinkItem } from './TS/NavigationBottom.interface';

import { Wrapper, NavItem, NavHolder } from './style/navigationBottom.style';

const LinkItem: FC<ILinkItem> = ({ href, title }) => (
  <Link href={href}>
    <NavItem>{title}</NavItem>
  </Link>
);
const NavigationBottom: () => JSX.Element = () => (
  <Wrapper>
    <NavHolder>
      <LinkItem href="/" title="Domov" />
      <LinkItem href="/o-nas" title="O nás" />
      <LinkItem href="/eshop/products" title="Produkty" />
      <LinkItem href="/eshop/services" title="Služby" />
      <LinkItem href="/eshop/stays" title="Pobyty" />
      <LinkItem href="/faq" title="Faq" />
    </NavHolder>
  </Wrapper>
);

export default NavigationBottom;
