import React, { FC } from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from './styles';

import { INavItem } from './TS/LhsNav.interface';
const LinkItem: FC<INavItem> = ({ href, title }) => (
  <NavItem>
    <Link href={href}>
      <NavLink className="lsnav-link" href={href}>
        {title}
      </NavLink>
    </Link>
  </NavItem>
);

const MyZoneNav: () => JSX.Element = () => (
  <Wrapper className="position-sticky">
    <Nav vertical>
      <NavItem className="lsnav-head">Moja zóna</NavItem>
      <LinkItem href="/moja-zona/objednavky" title="Moje objednávky" />
      <LinkItem href="/moja-zona/vernostny-program" title="Vernostný program" />
      <LinkItem href="/moja-zona/nastavenia" title="Nastavenia" />
    </Nav>
  </Wrapper>
);

export default MyZoneNav;
