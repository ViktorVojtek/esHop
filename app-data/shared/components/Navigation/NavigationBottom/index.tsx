import React, { FC } from 'react';
import Link from 'next/link';

import { ILinkItem } from './TS/NavigationBottom.interface';

import {
  Wrapper,
  NavItem,
  NavHolder,
  SocialHolder,
  Instagram,
  Facebook,
  Youtube,
} from './style/navigationBottom.style';

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
    <SocialHolder>
      <a
        href="https://www.facebook.com/KupeleCervenyKlastorSmerdzonka"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Facebook />
      </a>
      <a
        href="https://www.instagram.com/kupelecervenyklastorsmerdzonka/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Instagram />
      </a>
      <a
        href="https://www.youtube.com/channel/UCagE9AfD69zG7IOU9SMVgyg"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Youtube />
      </a>
    </SocialHolder>
  </Wrapper>
);

export default NavigationBottom;
