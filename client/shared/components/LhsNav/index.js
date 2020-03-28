import React from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from './styles';

const LhsNav = () => (
  <Wrapper className="position-sticky">
    <Nav vertical>
      <NavItem>e-Commerce</NavItem>
      <NavItem>Products</NavItem>
      <NavItem>Orders</NavItem>
      <NavItem>Customers</NavItem>
      <NavItem>Reviews</NavItem>
      <NavItem>
        <Link href="/admin/settings">
          <NavLink href="/admin/settings">
            Shop Settings
          </NavLink>
        </Link>
      </NavItem>
    </Nav>
  </Wrapper>
);

export default LhsNav;
