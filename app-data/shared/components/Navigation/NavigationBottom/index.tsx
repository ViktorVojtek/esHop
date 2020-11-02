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
      <LinkItem href="/eshop" title="Obchod" />
      <LinkItem href="/darcekove-poukazky" title="Darčekové poukážky" />
      <LinkItem href="/kontakt" title="Kontakt" />
    </NavHolder>
  </Wrapper>
);

export default NavigationBottom;
