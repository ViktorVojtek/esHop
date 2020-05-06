import React, { FC } from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from './styles';

import { INavItem } from './TS/LhsNav.interface';
const LinkItem: FC<INavItem> = ({ href, title }) => (
  <NavItem>
    <Link href={href}>
      <NavLink href={href}>{title}</NavLink>
    </Link>
  </NavItem>
);

const LhsNav: () => JSX.Element = () => (
  <Wrapper className="position-sticky">
    <Nav vertical>
      <NavItem>e-Commerce</NavItem>
      <LinkItem href="/admin/products" title="Products" />
      <LinkItem href="/admin/orders" title="Orders" />
      <LinkItem href="/admin/customers" title="Customers" />
      <LinkItem href="/admin/reviews" title="Reviews" />
      <LinkItem href="/admin/settings" title="Shop Settings" />
    </Nav>
  </Wrapper>
);

export default LhsNav;
