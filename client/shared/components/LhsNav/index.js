/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import {
  A, Nav, NavItem, Wrapper,
} from './styles';

const LhsNav = () => (
  <Wrapper>
    <Nav>
      <NavItem heading>e-Commerce</NavItem>
      <NavItem>Products</NavItem>
      <NavItem>Orders</NavItem>
      <NavItem>Customers</NavItem>
      <NavItem>Reviews</NavItem>
    </Nav>
    <Nav>
      <NavItem heading>
        <Link href="/admin/settings">
          <A>
            Shop Settings
          </A>
        </Link>
      </NavItem>
      <NavItem>Categories</NavItem>
      <NavItem>Sub Categories</NavItem>
    </Nav>
  </Wrapper>
);

export default LhsNav;
